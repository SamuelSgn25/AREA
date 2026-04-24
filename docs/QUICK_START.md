# AREA Platform

> **Production-Ready Automation Platform** - Connect your digital tools and automate your workflow with AREA.

[![GitHub Stars](https://img.shields.io/github/stars/samuelsgn/AREA.svg?style=social&label=Star)](https://github.com/samuelsgn/AREA)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/samuelsgn/AREA/ci-cd.yml?branch=main)](https://github.com/samuelsgn/AREA/actions)

## 📋 Quick Links

- 📖 [Full Documentation](./docs/)
- 🚀 [Getting Started](./docs/DEVELOPMENT.md)
- 🏗️ [Architecture](./docs/ARCHITECTURE.md)
- 🔌 [Service Integration](./docs/SERVICES.md)
- 🚢 [Deployment](./docs/DEPLOYMENT.md)
- 🤝 [Contributing](./CONTRIBUTING.md)

## 🎯 What is AREA?

AREA is an open-source automation platform that lets you create powerful workflows by connecting different services:

**Action** → Trigger detects an event (e.g., "New email from boss")
**REAction** → System executes a task (e.g., "Send Discord notification")

## 🔧 Technology Stack

| Component | Technology |
|-----------|-----------|
| Backend | Node.js 18+, Express, TypeScript, PostgreSQL |
| Frontend | React 18, TypeScript, TailwindCSS, Vite |
| Mobile | React Native, TypeScript |
| DevOps | Docker, GitHub Actions, Nginx |
| Database | PostgreSQL, Redis |

## 🚀 Quick Start

### Using Docker Compose (Recommended)

```bash
git clone https://github.com/samuelsgn/AREA.git
cd AREA

cp .env.example .env
docker-compose up -d

# API: http://localhost:5000
# Web: http://localhost:3000
```

### Manual Setup

```bash
# Backend
cd server && npm install && npm run db:migrate && npm run dev

# Frontend (new terminal)
cd web && npm install && npm run dev

# Mobile (new terminal)
cd mobile && npm install && npm run start
```

## 📦 Supported Services

- 🔵 **Google** - Gmail, Calendar, Sheets
- 🐦 **Twitter/X** - Posts, mentions, likes
- 🐙 **GitHub** - Stars, PRs, releases
- 💬 **Discord** - Messages, embeds
- 📧 **Slack** - Notifications
- 📡 **RSS Feed** - Article monitoring

## 📚 Documentation

Complete documentation available in [docs/](./docs/):

- [API Reference](./docs/API.md) - All endpoints
- [Architecture Guide](./docs/ARCHITECTURE.md) - System design
- [Service Integration](./docs/SERVICES.md) - Add new services
- [Deployment Guide](./docs/DEPLOYMENT.md) - Production setup
- [Development Guide](./docs/DEVELOPMENT.md) - Local development
- [Security Policy](./SECURITY.md) - Security guidelines

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - See [LICENSE](./LICENSE)

## 📞 Support

- 📧 Email: samuelsgn@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/samuelsgn/AREA/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/samuelsgn/AREA/discussions)

## 🌟 Show Your Support

If you find AREA helpful:
- ⭐ Star the repository
- 🔗 Share with others
- 🐛 Report bugs
- ✨ Contribute code

---

<div align="center">

Made with ❤️ by [Samuel SGN](https://github.com/samuelsgn)

[⬆ Back to Top](#area-platform)

</div>
