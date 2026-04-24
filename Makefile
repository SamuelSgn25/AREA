.PHONY: help install dev build test lint format clean deploy docs

help:
	@echo "AREA Platform - Available Commands"
	@echo "===================================="
	@echo ""
	@echo "Setup:"
	@echo "  make install       Install all dependencies"
	@echo "  make setup         Full development setup"
	@echo ""
	@echo "Development:"
	@echo "  make dev           Start all services in development mode"
	@echo "  make dev-api       Start API server only"
	@echo "  make dev-web       Start web client only"
	@echo "  make dev-mobile    Start mobile dev server only"
	@echo ""
	@echo "Building:"
	@echo "  make build         Build all components"
	@echo "  make build-api     Build API"
	@echo "  make build-web     Build web client"
	@echo ""
	@echo "Testing:"
	@echo "  make test          Run all tests"
	@echo "  make test-api      Test API"
	@echo "  make test-web      Test web"
	@echo "  make test-coverage Coverage report"
	@echo ""
	@echo "Code Quality:"
	@echo "  make lint          Lint all code"
	@echo "  make format        Format all code"
	@echo "  make type-check    Type check all"
	@echo ""
	@echo "Database:"
	@echo "  make db-migrate    Run migrations"
	@echo "  make db-seed       Seed database"
	@echo "  make db-reset      Reset database"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-build  Build Docker images"
	@echo "  make docker-up     Start Docker services"
	@echo "  make docker-down   Stop Docker services"
	@echo "  make docker-logs   View Docker logs"
	@echo ""
	@echo "Cleanup:"
	@echo "  make clean         Remove build artifacts"
	@echo "  make clean-all     Remove everything"

install:
	cd server && npm install
	cd web && npm install
	cd mobile && npm install

setup: install
	cp .env.example .env
	cd server && cp .env.example .env
	cd web && cp .env.example .env
	cd mobile && cp .env.example .env
	docker-compose up -d postgres redis
	cd server && npm run db:migrate

dev:
	@echo "Starting all services..."
	@echo "API: http://localhost:5000"
	@echo "Web: http://localhost:3000"
	@echo ""
	@echo "Open new terminals for each command:"
	@echo "  make dev-api"
	@echo "  make dev-web"
	@echo "  make dev-mobile"

dev-api:
	cd server && npm run dev

dev-web:
	cd web && npm run dev

dev-mobile:
	cd mobile && npm run start

build: build-api build-web

build-api:
	cd server && npm run build

build-web:
	cd web && npm run build

test:
	cd server && npm run test
	cd web && npm run test

test-api:
	cd server && npm run test

test-web:
	cd web && npm run test

test-coverage:
	cd server && npm run test:coverage
	cd web && npm run test:coverage

lint:
	cd server && npm run lint
	cd web && npm run lint
	cd mobile && npm run lint

format:
	cd server && npm run format
	cd web && npm run format
	cd mobile && npm run format

type-check:
	cd server && npm run type-check
	cd web && npm run type-check
	cd mobile && npm run type-check

db-migrate:
	cd server && npm run db:migrate

db-seed:
	cd server && npm run db:seed

db-reset:
	cd server && npm run db:reset

docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f

clean:
	find . -name dist -type d -exec rm -rf {} + 2>/dev/null || true
	find . -name build -type d -exec rm -rf {} + 2>/dev/null || true
	find . -name coverage -type d -exec rm -rf {} + 2>/dev/null || true

clean-all: clean
	find . -name node_modules -type d -exec rm -rf {} + 2>/dev/null || true
	docker-compose down -v

docs:
	@echo "Documentation available at:"
	@echo "  ./docs/README.md              - Documentation index"
	@echo "  ./docs/QUICK_START.md         - Quick start guide"
	@echo "  ./docs/DEVELOPMENT.md         - Development setup"
	@echo "  ./docs/ARCHITECTURE.md        - System architecture"
	@echo "  ./docs/API.md                 - API documentation"
	@echo "  ./docs/SERVICES.md            - Service integration"
	@echo "  ./docs/DEPLOYMENT.md          - Deployment guide"
	@echo "  ./CONTRIBUTING.md             - Contributing guidelines"
	@echo "  ./SECURITY.md                 - Security policy"
