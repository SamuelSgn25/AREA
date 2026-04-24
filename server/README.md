# AREA Platform - Backend API

## Overview

The backend is a production-grade Node.js/Express REST API that powers the AREA automation platform.

### Key Features

- ✅ Modular architecture
- ✅ TypeScript with strict typing
- ✅ PostgreSQL + Redis
- ✅ JWT + OAuth2 authentication
- ✅ Service integrations (Google, GitHub, Twitter, Discord, Slack, RSS)
- ✅ Comprehensive error handling
- ✅ Rate limiting & security headers
- ✅ Extensive logging with Winston
- ✅ Bull queue for async operations

## Quick Start

```bash
cd server

# Install dependencies
npm install

# Setup environment
cp .env.example .env
nano .env

# Database setup
npm run db:migrate
npm run db:seed

# Start development
npm run dev

# Run tests
npm run test:watch

# Build for production
npm run build
npm start
```

## Project Structure

```
server/
├── src/
│   ├── app.ts              # Express app setup
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── services/           # Business logic & integrations
│   │   ├── google.ts
│   │   ├── github.ts
│   │   ├── discord.ts
│   │   ├── slack.ts
│   │   ├── twitter.ts
│   │   └── rss.ts
│   ├── models/             # Data models & types
│   ├── middleware/         # Express middleware
│   ├── database/           # Database config & migrations
│   ├── utils/              # Utility functions
│   └── routes/             # API routes
├── __tests__/              # Test files
├── migrations/             # Database migrations
├── Dockerfile              # Container image
├── package.json
├── tsconfig.json
└── jest.config.js
```

## API Documentation

See [API.md](../docs/API.md) for complete endpoint documentation.

### Key Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/oauth/:provider
GET    /api/services
POST   /api/services/:id/connect
GET    /api/workflows
POST   /api/workflows
PUT    /api/workflows/:id
DELETE /api/workflows/:id
GET    /api/users/me
```

## Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Deployment

See [DEPLOYMENT.md](../docs/DEPLOYMENT.md) for production deployment instructions.

## Service Integration

To add a new service, see [SERVICES.md](../docs/SERVICES.md).

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## License

MIT - See [LICENSE](../LICENSE)
