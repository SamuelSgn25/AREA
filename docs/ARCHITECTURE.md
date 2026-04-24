# AREA Platform - Architecture Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
├─────────────────────────────────────────────────────────┤
│  Web (React)        │  Mobile (React Native)  │  Admin   │
└──────────┬──────────┴──────────┬──────────────┴────┬─────┘
           │                     │                    │
           └─────────────────────┼────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   REST API Gateway      │
                    │  (Express + Auth)       │
                    └────────────┬────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
   ┌────▼─────┐          ┌──────▼──────┐         ┌──────▼──┐
   │Auth      │          │Services     │         │Workflow │
   │Module    │          │Module       │         │Engine   │
   └────┬─────┘          └──────┬──────┘         └──────┬──┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │   Data Layer          │
                    │ (TypeORM)             │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │  PostgreSQL Database  │
                    │  Redis Cache          │
                    └───────────────────────┘
                                
                    ┌───────────────────────┐
                    │  External Services    │
                    │  OAuth Providers      │
                    │  Webhooks             │
                    └───────────────────────┘
```

## Core Modules

### 1. Authentication Module
**Responsibility**: User registration, login, OAuth2 integration

**Components**:
- JWT token generation/validation
- Password hashing (bcrypt)
- OAuth2 handlers for each provider
- Session management
- Email verification

**Key Files**:
- `server/src/controllers/auth.controller.ts`
- `server/src/middleware/auth.middleware.ts`
- `server/src/services/oauth/*.ts`

### 2. Services Module
**Responsibility**: Service integration and management

**Structure**:
```
services/
├── google/
│   ├── actions.ts      # Action definitions
│   ├── reactions.ts    # Reaction definitions
│   ├── oauth.ts        # OAuth2 flow
│   └── index.ts        # Export
├── github/
├── discord/
└── rss/
```

**Service Interface**:
```typescript
interface IService {
  id: string
  name: string
  authenticate(code: string): Promise<Token>
  validateConnection(): Promise<boolean>
  getActions(): Action[]
  getReactions(): Reaction[]
  executeAction(actionId: string, params: any): Promise<any>
  executeReaction(reactionId: string, data: any): Promise<any>
}
```

### 3. AREA Workflow Engine
**Responsibility**: Workflow creation, execution, and automation

**Components**:
- Workflow builder
- Trigger system (hooks)
- Action/Reaction executor
- Scheduler (Bull queues)
- Execution history

**Flow**:
```
User Creates AREA
    ↓
Workflow Stored in DB
    ↓
Hook Listener Activated
    ↓
Event Detected
    ↓
Action Condition Met? 
    ↓ Yes
Execute Reactions (Sequential)
    ↓
Log Execution
```

### 4. Hook System
**Responsibility**: Detect events and trigger workflows

**Types**:
- **Webhook Hooks**: Direct HTTP calls from external services
- **Polling Hooks**: Periodic checks (every 5-15 mins)
- **Real-time Hooks**: WebSocket/SSE connections

**Implementation**:
```typescript
// Hook listener
class HookListener {
  async listenForEvent(action: Action): Promise<void>
  async triggerWorkflows(event: Event): Promise<void>
}
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  username VARCHAR UNIQUE,
  password_hash VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,
  avatar_url VARCHAR,
  role VARCHAR DEFAULT 'user',
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  last_login TIMESTAMP
);
```

### OAuth Providers Table
```sql
CREATE TABLE oauth_providers (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  provider VARCHAR,
  provider_id VARCHAR,
  email VARCHAR,
  access_token VARCHAR,
  refresh_token VARCHAR,
  token_expiry TIMESTAMP,
  created_at TIMESTAMP
);
```

### Connected Services Table
```sql
CREATE TABLE connected_services (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  service_id VARCHAR,
  account_name VARCHAR,
  access_token VARCHAR,
  refresh_token VARCHAR,
  token_expiry TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  connected_at TIMESTAMP,
  last_used TIMESTAMP
);
```

### AREA Workflows Table
```sql
CREATE TABLE workflows (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  trigger_config JSONB,
  reactions_config JSONB,
  filters JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Execution History Table
```sql
CREATE TABLE execution_history (
  id UUID PRIMARY KEY,
  workflow_id UUID REFERENCES workflows(id),
  status VARCHAR,
  triggered_at TIMESTAMP,
  completed_at TIMESTAMP,
  error TEXT,
  execution_details JSONB
);
```

## API Flow Examples

### Example 1: User Registration & OAuth
```
1. User clicks "Sign up with Google"
2. Frontend redirects to Google OAuth
3. User authorizes AREA
4. Google redirects to /api/auth/oauth/google?code=...
5. Backend exchanges code for tokens
6. Backend creates user account
7. Backend returns JWT tokens
8. Frontend stores tokens in localStorage
```

### Example 2: Create AREA Workflow
```
1. User selects Action: "GitHub - New Star"
2. User configures parameters (repo name)
3. User selects Reaction: "Discord - Send Message"
4. User configures reaction parameters
5. Frontend POSTs /api/workflows
6. Backend validates action/reaction exist
7. Backend validates user has connected services
8. Backend creates workflow in database
9. Backend activates hook listener
10. Workflow activated ✓
```

### Example 3: Workflow Execution
```
1. GitHub webhook event arrives (new star)
2. Backend validates webhook signature
3. Backend finds matching workflows with this trigger
4. Backend checks filters (if any)
5. Backend executes reactions in order:
   - Fetch data from GitHub
   - Format message for Discord
   - Send to Discord API
   - Log execution
6. Frontend updates real-time stats
```

## Data Flow

```
External Event
      │
      ▼
Webhook/Polling Check
      │
      ▼
Match AREA Trigger?
      │
      ├─ NO → Discard
      │
      ├─ YES ▼
      │  Check Filters
      │      │
      │      ├─ Filters don't match → Discard
      │      │
      │      ├─ Filters match ▼
      │      │  Queue Reactions
      │      │      │
      │      │      ▼
      │      │  Execute Reaction 1
      │      │      │
      │      │      ▼
      │      │  Execute Reaction 2
      │      │      │
      │      │      ▼
      │      │  Execute Reaction N
      │      │      │
      │      │      ▼
      │      │  Log Execution
      │      │      │
      │      └──────┘
      │
      ▼
Execution Complete
```

## Scaling Considerations

### Horizontal Scaling
- Load balancer (Nginx)
- Multiple API instances
- Database connection pooling
- Redis cluster for caching

### Vertical Scaling
- Optimize database queries
- Implement caching layer
- Use async/await for I/O operations
- Batch webhook processing

### Performance Optimizations
1. **Database Indexing**: Index user_id, service_id, workflow_id
2. **Caching**: Cache user services, AREA definitions
3. **Rate Limiting**: Protect against abuse
4. **Async Processing**: Use Bull queues for heavy operations
5. **Connection Pooling**: Reuse DB connections

## Security Considerations

1. **Authentication**
   - JWT tokens with expiry
   - Refresh token rotation
   - Secure session management

2. **Authorization**
   - RBAC implementation
   - Scope validation for OAuth

3. **Data Protection**
   - Encrypt sensitive tokens
   - Hash passwords with bcrypt
   - HTTPS only communication

4. **Input Validation**
   - Validate all inputs
   - Sanitize user data
   - Prevent SQL injection (ORM)

5. **Rate Limiting**
   - API rate limits
   - Webhook rate limits
   - DDoS protection
