import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';

// Load environment variables
config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// Middleware
// ==========================================

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000').split(',');
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ==========================================
// Health Check
// ==========================================

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ==========================================
// API Routes (placeholder)
// ==========================================

// Authentication routes
app.post('/api/auth/register', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Register endpoint - To be implemented' });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Login endpoint - To be implemented' });
});

app.get('/api/services', (req: Request, res: Response) => {
  res.status(200).json({ 
    services: [
      { id: 1, name: 'Google', description: 'Google services integration' },
      { id: 2, name: 'Twitter', description: 'Twitter/X integration' },
      { id: 3, name: 'GitHub', description: 'GitHub integration' },
      { id: 4, name: 'Discord', description: 'Discord integration' },
      { id: 5, name: 'Slack', description: 'Slack integration' },
      { id: 6, name: 'RSS', description: 'RSS Feed integration' }
    ]
  });
});

// ==========================================
// 404 Handler
// ==========================================

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// Error Handler
// ==========================================

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: err.name || 'Error',
    message,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// ==========================================
// Start Server
// ==========================================

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
