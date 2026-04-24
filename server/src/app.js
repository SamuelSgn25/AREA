import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// In-Memory Database (for development)
// ==========================================
export const database = {
  users: [],
  services: [],
  connectedServices: [],
  workflows: [],
  notifications: [],
  executionHistory: []
};

// ==========================================
// Middleware
// ==========================================

app.use(helmet());

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000').split(',');
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ==========================================
// Auth Middleware
// ==========================================

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    // Simple token validation (in production, use JWT)
    const user = database.users.find(u => u.token === token);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token validation failed' });
  }
};

// ==========================================
// Health Check
// ==========================================

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ==========================================
// Auth Routes
// ==========================================

app.post('/api/auth/register', (req, res) => {
  const { email, username, password, firstName, lastName } = req.body;
  
  if (!email || !username || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (database.users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  
  const user = {
    id: uuidv4(),
    email,
    username,
    password: Buffer.from(password).toString('base64'),
    firstName,
    lastName,
    avatar: null,
    role: 'user',
    isVerified: false,
    isActive: true,
    token: uuidv4(),
    createdAt: new Date().toISOString()
  };
  
  database.users.push(user);
  
  res.status(201).json({
    success: true,
    data: { ...user, password: undefined }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }
  
  const user = database.users.find(u => u.email === email);
  
  if (!user || Buffer.from(password).toString('base64') !== user.password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  res.status(200).json({
    success: true,
    data: {
      accessToken: user.token,
      user: { ...user, password: undefined }
    }
  });
});

// ==========================================
// Services Routes
// ==========================================

const AVAILABLE_SERVICES = [
  {
    id: 'google',
    name: 'Google',
    description: 'Gmail, Calendar, Sheets',
    icon: '🔵',
    category: 'productivity',
    authentication: 'oauth2',
    actions: [
      { id: 'gmail-new-email', name: 'New Email', trigger: 'gmail.newEmail' },
      { id: 'calendar-event', name: 'Calendar Event', trigger: 'calendar.event' }
    ],
    reactions: [
      { id: 'send-email', name: 'Send Email', action: 'gmail.sendEmail' }
    ]
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Stars, PRs, Issues',
    icon: '🐙',
    category: 'development',
    authentication: 'oauth2',
    actions: [
      { id: 'new-star', name: 'New Star', trigger: 'github.newStar' },
      { id: 'pr-opened', name: 'PR Opened', trigger: 'github.prOpened' }
    ],
    reactions: [
      { id: 'create-issue', name: 'Create Issue', action: 'github.createIssue' }
    ]
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Messages, Embeds',
    icon: '💬',
    category: 'communication',
    authentication: 'oauth2',
    actions: [
      { id: 'message-received', name: 'Message', trigger: 'discord.message' }
    ],
    reactions: [
      { id: 'send-message', name: 'Send Message', action: 'discord.sendMessage' }
    ]
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Notifications',
    icon: '📧',
    category: 'communication',
    authentication: 'oauth2',
    actions: [
      { id: 'slack-message', name: 'Message', trigger: 'slack.message' }
    ],
    reactions: [
      { id: 'slack-notify', name: 'Send Message', action: 'slack.sendMessage' }
    ]
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    description: 'Posts, Mentions',
    icon: '🐦',
    category: 'social',
    authentication: 'oauth2',
    actions: [
      { id: 'tweet-posted', name: 'Tweet Posted', trigger: 'twitter.tweetPosted' }
    ],
    reactions: [
      { id: 'post-tweet', name: 'Post Tweet', action: 'twitter.postTweet' }
    ]
  },
  {
    id: 'rss',
    name: 'RSS Feed',
    description: 'Article Updates',
    icon: '📡',
    category: 'content',
    authentication: 'none',
    actions: [
      { id: 'new-article', name: 'New Article', trigger: 'rss.newArticle' }
    ],
    reactions: [
      { id: 'send-notification', name: 'Notify', action: 'rss.notify' }
    ]
  }
];

app.get('/api/services', authMiddleware, (req, res) => {
  res.json({
    success: true,
    data: AVAILABLE_SERVICES
  });
});

app.get('/api/services/:id', authMiddleware, (req, res) => {
  const service = AVAILABLE_SERVICES.find(s => s.id === req.params.id);
  
  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }
  
  res.json({
    success: true,
    data: service
  });
});

// ==========================================
// Connected Services Routes
// ==========================================

app.post('/api/services/:id/connect', authMiddleware, (req, res) => {
  const service = AVAILABLE_SERVICES.find(s => s.id === req.params.id);
  
  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }
  
  const connectedService = {
    id: uuidv4(),
    userId: req.user.id,
    serviceId: req.params.id,
    accountName: req.body.accountName || service.name,
    accessToken: uuidv4(),
    isActive: true,
    connectedAt: new Date().toISOString()
  };
  
  database.connectedServices.push(connectedService);
  
  res.status(201).json({
    success: true,
    data: connectedService
  });
});

app.get('/api/services/connected/list', authMiddleware, (req, res) => {
  const services = database.connectedServices.filter(s => s.userId === req.user.id);
  res.json({
    success: true,
    data: services
  });
});

app.delete('/api/services/:id/disconnect', authMiddleware, (req, res) => {
  const index = database.connectedServices.findIndex(
    s => s.serviceId === req.params.id && s.userId === req.user.id
  );
  
  if (index === -1) {
    return res.status(404).json({ error: 'Connected service not found' });
  }
  
  database.connectedServices.splice(index, 1);
  
  res.json({
    success: true,
    message: 'Service disconnected'
  });
});

// ==========================================
// Workflows Routes
// ==========================================

app.get('/api/workflows', authMiddleware, (req, res) => {
  const workflows = database.workflows.filter(w => w.userId === req.user.id);
  res.json({
    success: true,
    data: workflows
  });
});

app.post('/api/workflows', authMiddleware, (req, res) => {
  const { name, description, trigger, reactions } = req.body;
  
  if (!name || !trigger || !reactions) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const workflow = {
    id: uuidv4(),
    userId: req.user.id,
    name,
    description,
    trigger,
    reactions,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  database.workflows.push(workflow);
  
  res.status(201).json({
    success: true,
    data: workflow
  });
});

app.put('/api/workflows/:id', authMiddleware, (req, res) => {
  const workflow = database.workflows.find(w => w.id === req.params.id && w.userId === req.user.id);
  
  if (!workflow) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  
  Object.assign(workflow, req.body, { updatedAt: new Date().toISOString() });
  
  res.json({
    success: true,
    data: workflow
  });
});

app.delete('/api/workflows/:id', authMiddleware, (req, res) => {
  const index = database.workflows.findIndex(w => w.id === req.params.id && w.userId === req.user.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  
  database.workflows.splice(index, 1);
  
  res.json({
    success: true,
    message: 'Workflow deleted'
  });
});

// ==========================================
// Notifications Routes
// ==========================================

app.get('/api/notifications', authMiddleware, (req, res) => {
  const notifications = database.notifications.filter(n => n.userId === req.user.id);
  res.json({
    success: true,
    data: notifications
  });
});

app.post('/api/notifications', authMiddleware, (req, res) => {
  const { title, message, type, actionUrl } = req.body;
  
  const notification = {
    id: uuidv4(),
    userId: req.user.id,
    title,
    message,
    type: type || 'info',
    actionUrl,
    read: false,
    createdAt: new Date().toISOString()
  };
  
  database.notifications.push(notification);
  
  res.status(201).json({
    success: true,
    data: notification
  });
});

app.put('/api/notifications/:id/read', authMiddleware, (req, res) => {
  const notification = database.notifications.find(n => n.id === req.params.id && n.userId === req.user.id);
  
  if (!notification) {
    return res.status(404).json({ error: 'Notification not found' });
  }
  
  notification.read = true;
  
  res.json({
    success: true,
    data: notification
  });
});

// ==========================================
// User Routes
// ==========================================

app.get('/api/users/me', authMiddleware, (req, res) => {
  res.json({
    success: true,
    data: { ...req.user, password: undefined, token: undefined }
  });
});

app.put('/api/users/me', authMiddleware, (req, res) => {
  const user = req.user;
  Object.assign(user, req.body);
  
  res.json({
    success: true,
    data: { ...user, password: undefined, token: undefined }
  });
});

// ==========================================
// 404 Handler
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// ==========================================
// Error Handler
// ==========================================

app.use((err, req, res, next) => {
  console.error(err);
  
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({
    error: err.name || 'Error',
    message
  });
});

// ==========================================
// Start Server
// ==========================================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
