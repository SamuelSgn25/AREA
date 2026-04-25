import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

config();

type NotificationKind = 'success' | 'error' | 'warning' | 'info';

type UserRecord = {
  id: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  role: 'user';
  isVerified: boolean;
  isActive: boolean;
  token: string;
  createdAt: string;
};

type ServiceDefinition = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  authentication: 'oauth2' | 'none';
  actions: Array<{ id: string; name: string; trigger: string }>;
  reactions: Array<{ id: string; name: string; action: string }>;
};

type ConnectedServiceRecord = {
  id: string;
  userId: string;
  serviceId: string;
  accountName: string;
  accessToken: string;
  isActive: boolean;
  connectedAt: string;
};

type WorkflowRecord = {
  id: string;
  userId: string;
  name: string;
  description: string;
  trigger: string;
  reactions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type NotificationRecord = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationKind;
  actionUrl?: string;
  read: boolean;
  createdAt: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: UserRecord;
    }
  }
}

const app: Express = express();
const PORT = Number(process.env.PORT || 5000);

const encodePassword = (password: string) => Buffer.from(password).toString('base64');
const getCurrentUser = (req: Request) => req.user as UserRecord;

const createNotification = (
  userId: string,
  title: string,
  message: string,
  type: NotificationKind = 'info',
  actionUrl?: string
): NotificationRecord => ({
  id: uuidv4(),
  userId,
  title,
  message,
  type,
  actionUrl,
  read: false,
  createdAt: new Date().toISOString()
});

const availableServices: ServiceDefinition[] = [
  {
    id: 'google',
    name: 'Google',
    description: 'Gmail, Calendar, Sheets',
    icon: 'G',
    category: 'productivity',
    authentication: 'oauth2',
    actions: [
      { id: 'gmail-new-email', name: 'New Email', trigger: 'gmail.newEmail' },
      { id: 'calendar-event', name: 'Calendar Event', trigger: 'calendar.event' }
    ],
    reactions: [{ id: 'send-email', name: 'Send Email', action: 'gmail.sendEmail' }]
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Stars, PRs, Issues',
    icon: 'GH',
    category: 'development',
    authentication: 'oauth2',
    actions: [
      { id: 'new-star', name: 'New Star', trigger: 'github.newStar' },
      { id: 'pr-opened', name: 'PR Opened', trigger: 'github.prOpened' }
    ],
    reactions: [{ id: 'create-issue', name: 'Create Issue', action: 'github.createIssue' }]
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Messages, Embeds',
    icon: 'DS',
    category: 'communication',
    authentication: 'oauth2',
    actions: [{ id: 'message-received', name: 'Message', trigger: 'discord.message' }],
    reactions: [{ id: 'send-message', name: 'Send Message', action: 'discord.sendMessage' }]
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Notifications and channels',
    icon: 'SL',
    category: 'communication',
    authentication: 'oauth2',
    actions: [{ id: 'slack-message', name: 'Message', trigger: 'slack.message' }],
    reactions: [{ id: 'slack-notify', name: 'Send Message', action: 'slack.sendMessage' }]
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    description: 'Posts and mentions',
    icon: 'X',
    category: 'social',
    authentication: 'oauth2',
    actions: [{ id: 'tweet-posted', name: 'Tweet Posted', trigger: 'twitter.tweetPosted' }],
    reactions: [{ id: 'post-tweet', name: 'Post Tweet', action: 'twitter.postTweet' }]
  },
  {
    id: 'rss',
    name: 'RSS Feed',
    description: 'Article updates and feeds',
    icon: 'RSS',
    category: 'content',
    authentication: 'none',
    actions: [{ id: 'new-article', name: 'New Article', trigger: 'rss.newArticle' }],
    reactions: [{ id: 'send-notification', name: 'Notify', action: 'rss.notify' }]
  }
];

const demoUser: UserRecord = {
  id: uuidv4(),
  email: 'demo@area.local',
  username: 'demouser',
  password: encodePassword('demo1234'),
  firstName: 'Demo',
  lastName: 'User',
  avatar: null,
  role: 'user',
  isVerified: true,
  isActive: true,
  token: uuidv4(),
  createdAt: new Date().toISOString()
};

const database: {
  users: UserRecord[];
  connectedServices: ConnectedServiceRecord[];
  workflows: WorkflowRecord[];
  notifications: NotificationRecord[];
} = {
  users: [demoUser],
  connectedServices: [
    {
      id: uuidv4(),
      userId: demoUser.id,
      serviceId: 'github',
      accountName: 'Samuel GitHub',
      accessToken: uuidv4(),
      isActive: true,
      connectedAt: new Date().toISOString()
    }
  ],
  workflows: [
    {
      id: uuidv4(),
      userId: demoUser.id,
      name: 'GitHub vers Discord',
      description: 'Envoyer une alerte Discord a chaque nouvelle etoile.',
      trigger: 'github.newStar',
      reactions: ['discord.sendMessage'],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  notifications: [
    createNotification(
      demoUser.id,
      'Bienvenue sur AREA',
      'Votre compte demo est pret avec une integration GitHub active.',
      'success'
    ),
    createNotification(
      demoUser.id,
      'Workflow surveille',
      'Le scenario GitHub vers Discord est actif et en attente d evenements.',
      'info',
      '/workflows'
    )
  ]
};

const sanitizeUser = (user: UserRecord) => {
  const { password, token, ...safeUser } = user;
  return safeUser;
};

app.use(helmet());
app.use(
  cors({
    origin: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const user = database.users.find((entry) => entry.token === token);
  if (!user) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }

  req.user = user;
  next();
};

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: availableServices.length
  });
});

app.get('/api/auth/providers', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: availableServices
      .filter((service) => service.authentication === 'oauth2')
      .map((service) => ({
        id: service.id,
        name: service.name,
        authUrl: `/api/auth/${service.id}`
      }))
  });
});

app.get('/api/auth/:provider', (req: Request, res: Response) => {
  const provider = availableServices.find((service) => service.id === req.params.provider);

  if (!provider || provider.authentication !== 'oauth2') {
    res.status(404).json({ error: 'Provider not found' });
    return;
  }

  res.json({
    success: true,
    data: {
      provider: provider.id,
      mode: 'simulated-oauth2',
      authorizeUrl: `/api/auth/${provider.id}/callback?code=demo-${provider.id}`,
      message: `OAuth2 simulation ready for ${provider.name}.`
    }
  });
});

app.get('/api/auth/:provider/callback', (req: Request, res: Response) => {
  const provider = availableServices.find((service) => service.id === req.params.provider);

  if (!provider || provider.authentication !== 'oauth2') {
    res.status(404).json({ error: 'Provider not found' });
    return;
  }

  res.json({
    success: true,
    data: {
      provider: provider.id,
      code: req.query.code || null,
      status: 'authorized',
      simulated: true
    }
  });
});

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { email, username, password, firstName, lastName } = req.body as Record<string, string>;

  if (!email || !username || !password || !firstName || !lastName) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  if (database.users.some((user) => user.email === email)) {
    res.status(400).json({ error: 'Email already exists' });
    return;
  }

  const user: UserRecord = {
    id: uuidv4(),
    email,
    username,
    password: encodePassword(password),
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
  database.notifications.unshift(
    createNotification(user.id, 'Compte cree', 'Votre espace AREA est initialise.', 'success'),
    createNotification(user.id, 'Prochaine etape', 'Connectez un service pour lancer vos automatisations.', 'info')
  );

  res.status(201).json({
    success: true,
    data: {
      accessToken: user.token,
      user: sanitizeUser(user)
    }
  });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body as Record<string, string>;

  if (!email || !password) {
    res.status(400).json({ error: 'Missing email or password' });
    return;
  }

  const user = database.users.find((entry) => entry.email === email);
  if (!user || user.password !== encodePassword(password)) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  res.json({
    success: true,
    data: {
      accessToken: user.token,
      user: sanitizeUser(user)
    }
  });
});

app.get('/api/services', authMiddleware, (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const connectedIds = new Set(
    database.connectedServices.filter((service) => service.userId === user.id).map((service) => service.serviceId)
  );

  res.json({
    success: true,
    data: availableServices.map((service) => ({
      ...service,
      connected: connectedIds.has(service.id)
    }))
  });
});

app.get('/api/services/:id', authMiddleware, (req: Request, res: Response) => {
  const service = availableServices.find((entry) => entry.id === req.params.id);

  if (!service) {
    res.status(404).json({ error: 'Service not found' });
    return;
  }

  res.json({ success: true, data: service });
});

app.get('/api/services/connected/list', authMiddleware, (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const services = database.connectedServices.filter((entry) => entry.userId === user.id);
  res.json({ success: true, data: services });
});

app.post('/api/services/:id/connect', authMiddleware, (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const service = availableServices.find((entry) => entry.id === req.params.id);

  if (!service) {
    res.status(404).json({ error: 'Service not found' });
    return;
  }

  const existing = database.connectedServices.find(
    (entry) => entry.userId === user.id && entry.serviceId === service.id
  );

  if (existing) {
    res.json({ success: true, data: existing });
    return;
  }

  const connectedService: ConnectedServiceRecord = {
    id: uuidv4(),
    userId: user.id,
    serviceId: service.id,
    accountName: (req.body.accountName as string) || `${service.name} Workspace`,
    accessToken: uuidv4(),
    isActive: true,
    connectedAt: new Date().toISOString()
  };

  database.connectedServices.push(connectedService);
  database.notifications.unshift(
    createNotification(
      user.id,
      `${service.name} connecte`,
      `${service.name} est pret a alimenter vos workflows.`,
      'success',
      '/services'
    )
  );

  res.status(201).json({ success: true, data: connectedService });
});

app.delete('/api/services/:id/disconnect', authMiddleware, (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const index = database.connectedServices.findIndex(
    (entry) => entry.userId === user.id && entry.serviceId === req.params.id
  );

  if (index === -1) {
    res.status(404).json({ error: 'Connected service not found' });
    return;
  }

  const [removed] = database.connectedServices.splice(index, 1);
  database.notifications.unshift(
    createNotification(
      user.id,
      'Service deconnecte',
      `${removed.serviceId} a ete retire de vos integrations.`,
      'warning',
      '/services'
    )
  );

  res.json({ success: true, message: 'Service disconnected' });
});

app.get('/api/workflows', authMiddleware, (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const workflows = database.workflows.filter((entry) => entry.userId === user.id);
  res.json({ success: true, data: workflows });
});

app.post('/api/workflows', authMiddleware, (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const body = req.body as {
    name?: string;
    description?: string;
    trigger?: string;
    reactions?: string[] | string;
  };

  if (!body.name || !body.trigger || !body.reactions) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const workflow: WorkflowRecord = {
    id: uuidv4(),
    userId: user.id,
    name: body.name,
    description: body.description || '',
    trigger: body.trigger,
    reactions: Array.isArray(body.reactions) ? body.reactions : [body.reactions],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  database.workflows.unshift(workflow);
  database.notifications.unshift(
    createNotification(
      user.id,
      'Workflow cree',
      `${workflow.name} est enregistre et en attente de signaux.`,
      'success',
      '/workflows'
    )
  );

  res.status(201).json({ success: true, data: workflow });
});

app.put('/api/workflows/:id', authMiddleware, (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const workflow = database.workflows.find((entry) => entry.id === req.params.id && entry.userId === user.id);

  if (!workflow) {
    res.status(404).json({ error: 'Workflow not found' });
    return;
  }

  const updates = req.body as Partial<WorkflowRecord>;
  workflow.name = updates.name ?? workflow.name;
  workflow.description = updates.description ?? workflow.description;
  workflow.trigger = updates.trigger ?? workflow.trigger;
  workflow.reactions = Array.isArray(updates.reactions) ? updates.reactions : workflow.reactions;
  workflow.isActive = typeof updates.isActive === 'boolean' ? updates.isActive : workflow.isActive;
  workflow.updatedAt = new Date().toISOString();

  database.notifications.unshift(
    createNotification(
      user.id,
      workflow.isActive ? 'Workflow actif' : 'Workflow en pause',
      `${workflow.name} a ete mis a jour.`,
      workflow.isActive ? 'info' : 'warning',
      '/workflows'
    )
  );

  res.json({ success: true, data: workflow });
});

app.delete('/api/workflows/:id', authMiddleware, (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const index = database.workflows.findIndex((entry) => entry.id === req.params.id && entry.userId === user.id);

  if (index === -1) {
    res.status(404).json({ error: 'Workflow not found' });
    return;
  }

  const [removed] = database.workflows.splice(index, 1);
  database.notifications.unshift(
    createNotification(
      user.id,
      'Workflow supprime',
      `${removed.name} a ete supprime de votre espace.`,
      'warning',
      '/workflows'
    )
  );

  res.json({ success: true, message: 'Workflow deleted' });
});

app.get('/api/notifications', authMiddleware, (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const notifications = database.notifications.filter((entry) => entry.userId === user.id);
  res.json({ success: true, data: notifications });
});

app.post('/api/notifications', authMiddleware, (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const body = req.body as {
    title?: string;
    message?: string;
    type?: NotificationKind;
    actionUrl?: string;
  };

  if (!body.title || !body.message) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const notification = createNotification(user.id, body.title, body.message, body.type || 'info', body.actionUrl);
  database.notifications.unshift(notification);
  res.status(201).json({ success: true, data: notification });
});

app.put('/api/notifications/:id/read', authMiddleware, (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const notification = database.notifications.find((entry) => entry.id === req.params.id && entry.userId === user.id);

  if (!notification) {
    res.status(404).json({ error: 'Notification not found' });
    return;
  }

  notification.read = true;
  res.json({ success: true, data: notification });
});

app.get('/api/users/me', authMiddleware, (req: Request, res: Response) => {
  res.json({ success: true, data: sanitizeUser(getCurrentUser(req)) });
});

app.put('/api/users/me', authMiddleware, (req: Request, res: Response) => {
  const user = getCurrentUser(req);
  const updates = req.body as Partial<UserRecord>;

  user.firstName = updates.firstName ?? user.firstName;
  user.lastName = updates.lastName ?? user.lastName;
  user.username = updates.username ?? user.username;
  user.email = updates.email ?? user.email;
  user.avatar = updates.avatar ?? user.avatar;

  database.notifications.unshift(
    createNotification(user.id, 'Profil mis a jour', 'Vos informations ont ete sauvegardees.', 'success', '/profile')
  );

  res.json({ success: true, data: sanitizeUser(user) });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Route not found',
    timestamp: new Date().toISOString()
  });
});

app.use((err: Error & { status?: number }, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500).json({
    error: err.name || 'Error',
    message: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API Health: http://localhost:${PORT}/api/health`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

export { app, availableServices, database, demoUser };
export default app;
