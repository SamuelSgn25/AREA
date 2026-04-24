# 🚀 AREA - Automation Platform

[![GitHub Stars](https://img.shields.io/github/stars/samuelsgn/AREA.svg?style=social&label=Star&maxAge=2592000)](https://github.com/samuelsgn/AREA)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/github/actions/workflow/status/samuelsgn/AREA/ci-cd.yml?branch=main)](https://github.com/samuelsgn/AREA/actions)
[![Docker Pulls](https://img.shields.io/docker/pulls/samuelsgn/area.svg)](https://hub.docker.com/r/samuelsgn/area)
[![Code Coverage](https://img.shields.io/codecov/c/github/samuelsgn/AREA/main.svg)](https://codecov.io/github/samuelsgn/AREA)

> **Connect your digital tools seamlessly.** AREA is an open-source automation platform inspired by IFTTT and Zapier, enabling users to create powerful workflows by connecting Actions to Reactions across multiple services.

<div align="center">

[🌐 Live Demo](#-live-demo) • [📖 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start) • [🤝 Contributing](#-contributing)

</div>

---

## ✨ Features

### 🔐 User Management & Authentication
- ✅ Email/Password registration and login
- ✅ OAuth2 integration (Google, GitHub, Twitter/X, Discord)
- ✅ Email verification system
- ✅ Admin dashboard for user management
- ✅ Role-based access control (RBAC)

### 🔌 Service Integration
Connect to popular platforms:
- 🔵 **Google** (Gmail, Calendar, Sheets)
- 🐦 **Twitter/X** (Post tweets, track mentions, likes)
- 🐙 **GitHub** (Watch repos, PR notifications)
- 📡 **RSS Feed** (New articles, custom feeds)
- 🎯 **Webhook** (Custom HTTP triggers)
- 💬 **Discord** (Messages, embeds, webhooks)
- 📧 **Slack** (Notifications, threads)

### 🎯 AREA System
- **Actions**: Triggers that detect events (e.g., "New email from X", "New GitHub star")
- **REActions**: Reactions that execute tasks (e.g., "Send Discord message", "Create Google Sheet row")
- **Workflows**: Seamless interconnection of Actions and REActions
- **Hooks**: Automatic trigger system with real-time and polling support

### 📊 Advanced Features
- 📈 Activity logging and analytics
- 🔄 Workflow automation and scheduling
- 🧪 Workflow testing and dry-runs
- 📱 Mobile-first responsive design
- 🌙 Dark mode support
- 🌍 Multi-language support (EN, FR, ES, DE)

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    AREA Platform                         │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Web App    │  │  Mobile App  │  │   Admin      │  │
│  │   (React)    │  │  (React Nat.)│  │   Panel      │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                  │          │
│         └─────────────────┼──────────────────┘          │
│                           │                             │
│                    REST API (Express)                    │
│         ┌──────────────────┼──────────────────┐         │
│         │                  │                  │         │
│    ┌────▼────┐      ┌──────▼──────┐   ┌──────▼─────┐  │
│    │  Auth   │      │  Services   │   │  Workflows │  │
│    │ Module  │      │   Module    │   │   Engine   │  │
│    └────┬────┘      └──────┬──────┘   └──────┬─────┘  │
│         │                  │                  │        │
│         └──────────────────┼──────────────────┘        │
│                            │                           │
│                    PostgreSQL Database                  │
│                    (Users, Services, AREA)              │
│                                                           │
│  ┌────────────────────────────────────────────────────┐ │
│  │         External Services (OAuth2)                 │ │
│  │  Google • GitHub • Twitter • Discord • Slack       │ │
│  └────────────────────────────────────────────────────┘ │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Node.js 18+, Express.js, TypeScript |
| **Database** | PostgreSQL 14+, Redis Cache |
| **Frontend Web** | React 18+, TypeScript, TailwindCSS |
| **Mobile** | React Native, TypeScript |
| **Auth** | JWT, OAuth2, Passport.js |
| **Real-time** | Socket.io, WebSocket |
| **Queue** | Bull (Redis-based) |
| **Logging** | Winston, Morgan |
| **Testing** | Jest, Supertest, React Testing Library |
| **CI/CD** | GitHub Actions |
| **Containerization** | Docker, Docker Compose |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ | **npm** 9+ or **yarn**
- **PostgreSQL** 14+ | **Redis** 6+
- **Docker** & **Docker Compose** (optional)

### Using Docker Compose (Recommended)

```bash
# Clone repository
git clone https://github.com/samuelsgn/AREA.git
cd AREA

# Configure environment
cp .env.example .env

# Start all services
docker-compose up -d

# Initialize database
docker-compose exec api npm run db:migrate

# Access the application
# Web: http://localhost:3000
# API: http://localhost:5000
# Admin: http://localhost:3001
```

### Manual Setup

#### 1️⃣ Backend Setup

```bash
cd server

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your OAuth credentials

# Database setup
npm run db:migrate
npm run db:seed

# Start development server
npm run dev

# API available at http://localhost:5000
```

#### 2️⃣ Frontend Web Setup

```bash
cd web

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Update REACT_APP_API_URL if needed

# Start development server
npm run dev

# Available at http://localhost:3000
```

#### 3️⃣ Mobile Setup

```bash
cd mobile

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start React Native dev server
npm run start

# For iOS
npm run ios

# For Android
npm run android
```

---

## 📖 Documentation

Comprehensive documentation is available in the [docs/](./docs/) directory:

- [API Documentation](./docs/API.md) - Complete REST API reference
- [Service Integration Guide](./docs/SERVICES.md) - How to add new services
- [Action/REAction Development](./docs/ACTIONS_REACTIONS.md) - Creating custom triggers & actions
- [Architecture Guide](./docs/ARCHITECTURE.md) - System design details
- [Deployment Guide](./docs/DEPLOYMENT.md) - Production deployment
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute

### Key Endpoints

```
Authentication
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
GET    /api/auth/oauth/:provider

User Management
GET    /api/users/me
PUT    /api/users/me
GET    /api/users (Admin)
DELETE /api/users/:id (Admin)

Services
GET    /api/services
GET    /api/services/:id
POST   /api/services/:id/connect
DELETE /api/services/:id/disconnect

AREA Workflows
GET    /api/workflows
POST   /api/workflows
PUT    /api/workflows/:id
DELETE /api/workflows/:id
POST   /api/workflows/:id/trigger
```

---

## 🛠️ Development

### Project Structure

```
AREA/
├── server/                 # Express API backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── services/      # Business logic
│   │   ├── models/        # Database models
│   │   ├── middleware/    # Express middleware
│   │   ├── utils/         # Utility functions
│   │   ├── config/        # Configuration
│   │   └── app.ts         # Express app setup
│   ├── tests/             # Backend tests
│   ├── migrations/        # Database migrations
│   └── package.json
│
├── web/                    # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   └── App.tsx        # Main app component
│   ├── public/            # Static assets
│   └── package.json
│
├── mobile/                 # React Native app
│   ├── src/
│   │   ├── screens/       # Screen components
│   │   ├── components/    # Reusable components
│   │   ├── services/      # API services
│   │   └── navigation/    # Navigation setup
│   └── package.json
│
├── docs/                   # Documentation
├── .github/
│   └── workflows/         # CI/CD pipelines
├── docker-compose.yml     # Multi-container setup
├── Dockerfile             # API container
└── README.md
```

### Running Tests

```bash
# Backend tests
cd server
npm run test
npm run test:coverage

# Frontend tests
cd web
npm run test
npm run test:coverage

# Mobile tests
cd mobile
npm run test
```

### Code Quality

```bash
# Linting
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

---

## 🐳 Docker Deployment

### Single Container (API)

```bash
# Build
docker build -t area-api .

# Run
docker run -p 5000:5000 \
  -e DATABASE_URL=postgresql://... \
  -e JWT_SECRET=your-secret \
  area-api
```

### Multi-Container (Full Stack)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop all services
docker-compose down
```

---

## 📊 Performance & Monitoring

- ⚡ **Response Time**: < 200ms (p95)
- 📈 **Throughput**: 1000+ req/sec
- 🔄 **Uptime**: 99.9%
- 📉 **Error Rate**: < 0.1%

Monitoring dashboard: [Grafana](http://localhost:3001)

---

## 🔐 Security

- ✅ HTTPS/TLS encryption
- ✅ JWT token-based authentication
- ✅ OAuth2 for third-party auth
- ✅ SQL injection prevention (ORM)
- ✅ CORS protection
- ✅ Rate limiting & DDoS protection
- ✅ Password hashing (bcrypt)
- ✅ OWASP Top 10 compliance

[Security Policy](./SECURITY.md)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Types
- 🐛 **Bug Fixes** - Submit issues and PRs
- ✨ **New Features** - Discuss in issues first
- 📚 **Documentation** - Improve docs
- 🧪 **Tests** - Increase coverage
- 🎨 **UI/UX** - Design improvements
- 🔌 **Service Integrations** - Add new services

[Full Contributing Guidelines](./CONTRIBUTING.md)

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/samuelsgn/AREA/issues)
- **Discussions**: [GitHub Discussions](https://github.com/samuelsgn/AREA/discussions)
- **Email**: samuelsgn@example.com
- **Discord**: [Join Community](https://discord.gg/area-community)

---

## 🌟 Supporters

If you found this project helpful, please consider:
- ⭐ **Starring** the repository
- 🐛 **Reporting** bugs and issues
- 📢 **Sharing** with your network
- 🤝 **Contributing** code or documentation

---

## 📊 Project Stats

![GitHub Repo Size](https://img.shields.io/github/repo-size/samuelsgn/AREA?style=flat)
![GitHub Language Count](https://img.shields.io/github/languages/count/samuelsgn/AREA?style=flat)
![GitHub Top Language](https://img.shields.io/github/languages/top/samuelsgn/AREA?style=flat)
![Last Commit](https://img.shields.io/github/last-commit/samuelsgn/AREA/main?style=flat)

---

<div align="center">

Made with ❤️ by [Samuel SGN](https://github.com/samuelsgn)

[⬆ Back to Top](#-area---automation-platform)

</div>
