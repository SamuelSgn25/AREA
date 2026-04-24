@echo off
REM AREA Platform - Development Environment Setup Script

echo.
echo 🚀 AREA Platform - Setup Script
echo ================================
echo.

REM Check prerequisites
echo Checking prerequisites...

where node >nul 2>nul
if %errorlevel% neq 0 (
  echo ❌ Node.js is not installed
  exit /b 1
)

where docker >nul 2>nul
if %errorlevel% neq 0 (
  echo ❌ Docker is not installed
  exit /b 1
)

echo ✅ Prerequisites check passed

REM Setup backend
echo.
echo 📦 Setting up backend...
cd server
call npm install
copy .env.example .env
echo ✅ Backend setup complete

REM Setup frontend
echo.
echo 📦 Setting up frontend...
cd ..\web
call npm install
copy .env.example .env
echo ✅ Frontend setup complete

REM Setup mobile
echo.
echo 📦 Setting up mobile...
cd ..\mobile
call npm install
copy .env.example .env
echo ✅ Mobile setup complete

cd ..

REM Start Docker services
echo.
echo 🐳 Starting Docker services...
docker-compose up -d postgres redis
echo ✅ Docker services started

REM Run migrations
echo.
echo 🗄️  Running database migrations...
cd server
call npm run db:migrate
echo ✅ Database migrations complete

cd ..

echo.
echo ================================
echo ✨ Setup complete!
echo ================================
echo.
echo Next steps:
echo 1. Update .env files with your configuration
echo 2. Start development servers:
echo    - Backend: cd server ^&^& npm run dev
echo    - Frontend: cd web ^&^& npm run dev
echo    - Mobile: cd mobile ^&^& npm run start
echo.
echo Documentation: https://github.com/samuelsgn/AREA/tree/main/docs
