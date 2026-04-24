# Development Setup

## Backend Development

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+

### Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
nano .env

# Start database and redis
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:15-alpine
docker run -d -p 6379:6379 redis:7-alpine

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed

# Start development server
npm run dev

# In another terminal, run tests
npm run test:watch

# Check code quality
npm run lint
npm run type-check
```

## Frontend Development

### Prerequisites
- Node.js 18+
- npm/yarn

### Setup

```bash
cd web

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev

# Access at http://localhost:3000

# Run tests
npm run test

# Check code quality
npm run lint
npm run type-check
```

## Mobile Development

### Prerequisites
- Node.js 18+
- Android Studio (for Android)
- Xcode (for iOS on macOS)

### Setup

```bash
cd mobile

# Install dependencies
npm install

# Start development server
npm run start

# For Android
npm run android

# For iOS
npm run ios

# Run tests
npm run test
```

## Database Setup

### Manual PostgreSQL Setup

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE area_db;
CREATE USER areauser WITH PASSWORD 'areapass';
GRANT ALL PRIVILEGES ON DATABASE area_db TO areauser;

# Exit and connect to area_db
\q
psql -U areauser -d area_db

# Run migrations
npm run db:migrate
```

### Using Docker

```bash
# Start PostgreSQL
docker run -d \
  -e POSTGRES_USER=areauser \
  -e POSTGRES_PASSWORD=areapass \
  -e POSTGRES_DB=area_db \
  -p 5432:5432 \
  --name area-postgres \
  postgres:15-alpine

# Connect and verify
psql -h localhost -U areauser -d area_db
```

## OAuth Configuration

### Google
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add URIs:
   - Authorized redirect URI: `http://localhost:5000/api/auth/oauth/google/callback`
6. Copy Client ID and Client Secret to .env

### GitHub
1. Go to [GitHub Settings - Developer applications](https://github.com/settings/developers)
2. Create New OAuth App
3. Authorization callback URL: `http://localhost:5000/api/auth/oauth/github/callback`
4. Copy Client ID and Client Secret to .env

### Similar for Twitter, Discord, Slack

## API Testing

### Using cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Get services
curl -H "Authorization: Bearer <token>" http://localhost:5000/api/services

# Create workflow
curl -X POST http://localhost:5000/api/workflows \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Workflow",
    "trigger": {...},
    "reactions": [...]
  }'
```

### Using Postman/Insomnia
- Import collection from `docs/postman-collection.json`
- Set environment variables
- Test endpoints

## Common Issues

### Port already in use
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

### Database connection error
```bash
# Check PostgreSQL status
docker ps

# Check Redis status
docker ps

# Verify credentials in .env
```

### Module not found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Build errors
```bash
# Clear build cache
rm -rf dist
npm run build
```

## Code Style

We use:
- **Prettier** for formatting
- **ESLint** for linting
- **TypeScript** for type safety

```bash
# Format code
npm run format

# Lint code
npm run lint

# Fix lint errors
npm run lint:fix

# Type check
npm run type-check
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "Add feature"

# Push to remote
git push origin feature/my-feature

# Create Pull Request on GitHub
```

## Performance Profiling

### Backend
```bash
# Use Node.js inspector
node --inspect dist/app.js
# Open chrome://inspect
```

### Frontend
```bash
# React DevTools browser extension
# Performance tab in Chrome DevTools
```

## Debugging

### VS Code

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Backend",
      "program": "${workspaceFolder}/server/dist/app.js",
      "preLaunchTask": "build",
      "outFiles": ["${workspaceFolder}/server/dist/**/*.js"]
    }
  ]
}
```

### Chrome DevTools
- Frontend: Open DevTools (F12)
- Mobile: Remote debugging in Chrome

## Resources

- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Express Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [OAuth 2.0 Spec](https://tools.ietf.org/html/rfc6749)
