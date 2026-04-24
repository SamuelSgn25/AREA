#!/bin/bash

# AREA Platform - Development Environment Setup Script

set -e

echo "🚀 AREA Platform - Setup Script"
echo "================================"

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed"
  exit 1
fi

if ! command -v npm &> /dev/null; then
  echo "❌ npm is not installed"
  exit 1
fi

if ! command -v docker &> /dev/null; then
  echo "❌ Docker is not installed"
  exit 1
fi

echo "✅ Prerequisites check passed"

# Setup backend
echo ""
echo "📦 Setting up backend..."
cd server
npm install
cp .env.example .env
echo "✅ Backend setup complete"

# Setup frontend
echo ""
echo "📦 Setting up frontend..."
cd ../web
npm install
cp .env.example .env
echo "✅ Frontend setup complete"

# Setup mobile
echo ""
echo "📦 Setting up mobile..."
cd ../mobile
npm install
cp .env.example .env
echo "✅ Mobile setup complete"

cd ..

# Start Docker services
echo ""
echo "🐳 Starting Docker services..."
docker-compose up -d postgres redis
echo "✅ Docker services started"

# Run migrations
echo ""
echo "🗄️  Running database migrations..."
cd server
npm run db:migrate
echo "✅ Database migrations complete"

cd ..

echo ""
echo "================================"
echo "✨ Setup complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Update .env files with your configuration"
echo "2. Start development servers:"
echo "   - Backend: cd server && npm run dev"
echo "   - Frontend: cd web && npm run dev"
echo "   - Mobile: cd mobile && npm run start"
echo ""
echo "Documentation: https://github.com/samuelsgn/AREA/tree/main/docs"
