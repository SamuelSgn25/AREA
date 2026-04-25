import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { query } from './db/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// ==========================================
// Middleware
// ==========================================

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// ==========================================
// Auth Middleware
// ==========================================

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const result = await query('SELECT * FROM users WHERE id = $1', [decoded.id]);
    if (result.rows.length === 0) return res.status(403).json({ error: 'Invalid token' });
    req.user = result.rows[0];
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token expired or invalid' });
  }
};

// ==========================================
// Routes
// ==========================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// Register
app.post('/api/auth/register', async (req, res) => {
  const { email, username, password, firstName, lastName } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      'INSERT INTO users (email, username, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, username',
      [email, username, hashedPassword, firstName, lastName]
    );
    res.status(201).json({ success: true, user: result.rows[0] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'User not found' });
    
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
    res.json({ success: true, token, user: { id: user.id, email: user.email, username: user.username } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Services List
app.get('/api/services', authenticateToken, async (req, res) => {
  try {
    const services = await query('SELECT * FROM services WHERE is_active = TRUE');
    const actions = await query('SELECT * FROM actions');
    const reactions = await query('SELECT * FROM reactions');

    const data = services.rows.map(s => ({
      ...s,
      actions: actions.rows.filter(a => a.service_id === s.id),
      reactions: reactions.rows.filter(r => r.service_id === s.id)
    }));

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Workflows (AREAs)
app.get('/api/about.json', (req, res) => {
    const client_ip = req.ip.replace('::ffff:', '');
    res.json({
        client: {
            host: client_ip
        },
        server: {
            current_time: Math.floor(Date.now() / 1000),
            services: [
                {
                    name: "github",
                    actions: [{ name: "new_repo", description: "A new repository is created" }],
                    reactions: [{ name: "create_issue", description: "Create a new issue" }]
                }
            ]
        }
    });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
