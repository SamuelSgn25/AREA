# AREA Platform - Deployment Guide

## Prerequisites

- Docker & Docker Compose installed
- Domain name (for production)
- SSL certificate (for production)
- OAuth2 credentials for all services
- Email service account (SMTP)

## Development Deployment

### Using Docker Compose

```bash
# Clone repository
git clone https://github.com/samuelsgn/AREA.git
cd AREA

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Start services
docker-compose up -d

# Initialize database
docker-compose exec api npm run db:migrate
docker-compose exec api npm run db:seed

# Check logs
docker-compose logs -f api web
```

### Access Points
- **Web App**: http://localhost:3000
- **API**: http://localhost:5000
- **API Docs**: http://localhost:5000/api/docs

## Production Deployment

### 1. Server Setup

#### Requirements
- Ubuntu 20.04+ or similar Linux
- 4GB RAM minimum
- 20GB storage
- Port 80, 443 open

#### Initial Setup
```bash
# Connect to server
ssh user@your-server.com

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create app directory
sudo mkdir -p /app/area
sudo chown $USER /app/area
cd /app/area

# Clone repository
git clone https://github.com/samuelsgn/AREA.git .

# Copy and configure environment
cp .env.example .env
nano .env
```

### 2. SSL Configuration

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Update docker-compose.yml with certificate paths
```

### 3. Nginx Configuration

Create `nginx.conf`:

```nginx
upstream api {
  server api:5000;
}

upstream web {
  server web:3000;
}

server {
  listen 443 ssl http2;
  server_name yourdomain.com www.yourdomain.com;

  ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;

  # API endpoints
  location /api/ {
    proxy_pass http://api/api/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  # Web app
  location / {
    proxy_pass http://web/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
  }
}

server {
  listen 80;
  server_name yourdomain.com www.yourdomain.com;
  return 301 https://$server_name$request_uri;
}
```

### 4. Deploy

```bash
# Pull latest changes
git pull origin main

# Update environment if needed
nano .env

# Start/update services
docker-compose pull
docker-compose up -d

# Run migrations
docker-compose exec api npm run db:migrate

# Check status
docker-compose ps
```

### 5. Monitoring

#### View Logs
```bash
docker-compose logs -f api
docker-compose logs -f web
docker-compose logs -f postgres
```

#### Health Check
```bash
curl https://yourdomain.com/api/health
```

#### Database Backups
```bash
# Daily backup script
sudo crontab -e

# Add line:
0 3 * * * cd /app/area && docker-compose exec -T postgres pg_dump -U areauser area_db > /backups/area_$(date +\%Y\%m\%d).sql
```

## CI/CD Pipeline

### GitHub Actions Setup

1. Add secrets to repository:
   - `DOCKER_USERNAME`
   - `DOCKER_PASSWORD`
   - `DEPLOY_HOST`
   - `DEPLOY_USER`
   - `DEPLOY_KEY`
   - `REACT_APP_API_URL`

2. Push to main branch triggers:
   - Tests on all components
   - Build Docker images
   - Push to Docker Hub
   - Deploy to production server

### Deployment Process
```
Push to main
    ↓
Run Tests (API + Web)
    ↓
Build Docker Images
    ↓
Push to Docker Hub
    ↓
SSH to Server
    ↓
Pull Latest Code
    ↓
Pull Latest Docker Images
    ↓
Run Migrations
    ↓
Restart Services
    ↓
Verify Health
```

## Scaling

### Horizontal Scaling

```yaml
# docker-compose.yml
api:
  deploy:
    replicas: 3  # Run 3 API instances
```

### Database Scaling

```bash
# PostgreSQL Replication
# Primary-Replica setup for read scaling

# Redis Cluster
# For distributed caching
```

## Monitoring & Maintenance

### Key Metrics
- API response time (target: <200ms)
- Error rate (target: <0.1%)
- Database query time
- Memory usage
- Disk usage

### Regular Tasks
- [ ] Check logs daily
- [ ] Update dependencies weekly
- [ ] Review metrics weekly
- [ ] Database optimization monthly
- [ ] Security audit quarterly

## Troubleshooting

### Service won't start
```bash
# Check logs
docker-compose logs api

# Check port conflicts
sudo netstat -tlnp | grep 5000

# Restart service
docker-compose restart api
```

### Database connection error
```bash
# Verify PostgreSQL is running
docker-compose ps postgres

# Check database
docker-compose exec postgres psql -U areauser -d area_db -c "\dt"

# Reset database (⚠️ Data loss!)
docker-compose exec -T postgres dropdb -U areauser area_db
docker-compose exec api npm run db:migrate
```

### High memory usage
```bash
# Check container stats
docker stats

# Restart service
docker-compose restart api

# Consider scaling/optimization
```

## Backup & Recovery

### Backup Database
```bash
docker-compose exec -T postgres pg_dump -U areauser area_db > backup.sql
```

### Restore Database
```bash
docker-compose exec -T postgres psql -U areauser area_db < backup.sql
```

### Backup Configuration
```bash
# Backup .env and docker-compose files
tar czf backup.tar.gz .env docker-compose.yml nginx.conf
```

## Support

For deployment issues:
- Check [Architecture Guide](./ARCHITECTURE.md)
- Review [Contributing Guide](../CONTRIBUTING.md)
- Open an issue on GitHub
- Join Discord community
