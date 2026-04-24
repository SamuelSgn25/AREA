# AREA - Documentation Index

Complete documentation for the AREA automation platform.

## Getting Started

- [README.md](../README.md) - Project overview
- [CONTRIBUTING.md](../CONTRIBUTING.md) - How to contribute
- [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) - Community guidelines

## Development

- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development setup and workflow
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture and design
- [API.md](./API.md) - REST API documentation

## Deployment & Operations

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Production deployment guide
- [SERVICES.md](./SERVICES.md) - Service integration guide

## Security

- [SECURITY.md](../SECURITY.md) - Security policy and best practices

## Component Documentation

### Backend ([server/](../server/))
- REST API with Express.js
- PostgreSQL database
- Redis caching
- Service integrations
- OAuth2 authentication

### Frontend Web ([web/](../web/))
- React 18 single-page application
- TailwindCSS styling
- React Router navigation
- API client integration

### Mobile ([mobile/](../mobile/))
- React Native application
- Cross-platform (iOS/Android)
- Navigation system
- API integration

## Quick Links

### Common Tasks

**Setting up local development**
1. See [DEVELOPMENT.md](./DEVELOPMENT.md)
2. Follow backend setup (server/README.md)
3. Follow frontend setup (web/README.md)

**Adding a new service**
1. See [SERVICES.md](./SERVICES.md)
2. Follow the step-by-step guide

**Deploying to production**
1. See [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Follow the server setup instructions

**Contributing code**
1. See [CONTRIBUTING.md](../CONTRIBUTING.md)
2. Follow the development workflow

## API Reference

For detailed API endpoint documentation, see [API.md](./API.md)

### Main Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/services` - List available services
- `GET /api/workflows` - List user workflows
- `POST /api/workflows` - Create workflow

## Troubleshooting

### Backend Issues
- Check [DEVELOPMENT.md - Common Issues](./DEVELOPMENT.md#common-issues)
- Review logs: `docker-compose logs api`

### Database Issues
- PostgreSQL won't connect: [DEPLOYMENT.md - Troubleshooting](./DEPLOYMENT.md#troubleshooting)

### Frontend Issues
- Port conflicts: Check if 3000 is available
- Dependencies: Run `npm install --force`

### Deployment Issues
- See [DEPLOYMENT.md - Troubleshooting](./DEPLOYMENT.md#troubleshooting)

## FAQ

**Q: How do I run the project locally?**
A: See [DEVELOPMENT.md](./DEVELOPMENT.md)

**Q: How do I add a new OAuth provider?**
A: See [SERVICES.md](./SERVICES.md) - Adding a New Service

**Q: How do I deploy to production?**
A: See [DEPLOYMENT.md](./DEPLOYMENT.md)

**Q: How do I report security issues?**
A: See [SECURITY.md](../SECURITY.md) - Reporting

**Q: Where can I find the API documentation?**
A: See [API.md](./API.md)

## Additional Resources

- [GitHub Repository](https://github.com/samuelsgn/AREA)
- [Issue Tracker](https://github.com/samuelsgn/AREA/issues)
- [Discussions](https://github.com/samuelsgn/AREA/discussions)
- [Discord Community](https://discord.gg/area-community)

## Document Updates

Last Updated: December 2024

To suggest documentation improvements:
1. Open an issue on GitHub
2. Submit a pull request with changes
3. Email: docs@area-platform.com
