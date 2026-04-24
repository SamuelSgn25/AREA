# AREA Platform - Services Integration Guide

## Overview
This guide explains how to integrate new services into the AREA platform.

## Supported Services

### Current Implementations

#### 1. 🔵 Google
- **OAuth**: Yes
- **Actions**:
  - New Email Received
  - Email with Label
  - Calendar Event Created
- **Reactions**:
  - Send Email
  - Create Calendar Event
  - Add Google Sheets Row

#### 2. 🐦 Twitter/X
- **OAuth**: Yes
- **Actions**:
  - New Tweet Posted (yours)
  - Tweet with Hashtag
  - Mention Received
  - Like Received
- **Reactions**:
  - Post Tweet
  - Like Tweet
  - Retweet

#### 3. 🐙 GitHub
- **OAuth**: Yes
- **Actions**:
  - New Repository Star
  - Pull Request Opened
  - Issue Created
  - Release Published
- **Reactions**:
  - Create Issue
  - Create Pull Request
  - Create Release

#### 4. 💬 Discord
- **OAuth**: Yes
- **Actions**:
  - Message Received
  - Member Joined
- **Reactions**:
  - Send Message
  - Send Embed
  - Create Channel

#### 5. 📧 Slack
- **OAuth**: Yes
- **Actions**:
  - New Message
  - Reaction Added
- **Reactions**:
  - Send Message
  - Upload File
  - Set Topic

#### 6. 📡 RSS Feed
- **OAuth**: No
- **Actions**:
  - New Article Published
- **Reactions**:
  - Send Notification

## Adding a New Service

### Step 1: Create Service Definition

Create file: `server/src/services/[service-name].ts`

```typescript
import { Service } from '../models';

export const [serviceName]Service: Service = {
  id: 'service-id',
  name: 'Service Name',
  description: 'Service description',
  icon: 'https://...',
  category: 'category',
  isActive: true,
  authentication: 'oauth2' | 'api_key' | 'webhook' | 'none',
  actions: [],
  reactions: [],
  oauthConfig: {
    clientId: process.env.SERVICE_CLIENT_ID,
    clientSecret: process.env.SERVICE_CLIENT_SECRET,
    redirectUri: `${process.env.API_URL}/api/auth/oauth/service/callback`
  }
};
```

### Step 2: Define Actions

```typescript
actions: [
  {
    id: 'unique-action-id',
    serviceId: 'service-id',
    name: 'Action Name',
    description: 'What this action does',
    trigger: 'service.actionName',
    parameters: [
      {
        name: 'parameterName',
        type: 'string' | 'number' | 'boolean' | 'date' | 'select',
        required: true,
        description: 'Parameter description',
        placeholder: 'example value',
        options: [], // For select type
      }
    ],
    webhook: true, // if service sends webhooks
    pollingInterval: 300000 // ms, if polling
  }
]
```

### Step 3: Define Reactions

```typescript
reactions: [
  {
    id: 'unique-reaction-id',
    serviceId: 'service-id',
    name: 'Reaction Name',
    description: 'What this reaction does',
    action: 'service.reactionName',
    parameters: [
      {
        name: 'parameterName',
        type: 'string' | 'textarea' | 'number' | 'date' | 'select',
        required: true,
        description: 'Parameter description',
        placeholder: 'example value',
        mapFromTrigger: 'fieldFromAction' // Automatically populate from action
      }
    ]
  }
]
```

### Step 4: Implement OAuth Handler

Create file: `server/src/services/[service-name]/oauth.ts`

```typescript
import axios from 'axios';

export class ServiceOAuthHandler {
  async exchangeCodeForToken(code: string): Promise<{
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
  }> {
    const response = await axios.post('https://oauth.service.com/token', {
      code,
      client_id: process.env.SERVICE_CLIENT_ID,
      client_secret: process.env.SERVICE_CLIENT_SECRET,
      redirect_uri: `${process.env.API_URL}/api/auth/oauth/service/callback`,
      grant_type: 'authorization_code'
    });

    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in
    };
  }

  async getUserInfo(accessToken: string): Promise<{
    id: string;
    email: string;
    name: string;
    avatar?: string;
  }> {
    const response = await axios.get('https://api.service.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    return {
      id: response.data.id,
      email: response.data.email,
      name: response.data.name,
      avatar: response.data.avatar_url
    };
  }
}
```

### Step 5: Implement Action Executor

Create file: `server/src/services/[service-name]/actions.ts`

```typescript
import axios from 'axios';

export class ServiceActionExecutor {
  constructor(private accessToken: string) {}

  async executeActionName(parameters: any): Promise<any> {
    // Fetch data from service API
    const response = await axios.get(
      'https://api.service.com/endpoint',
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
        params: parameters
      }
    );

    return {
      id: response.data.id,
      title: response.data.title,
      description: response.data.description,
      // ... other fields needed for reactions
    };
  }
}
```

### Step 6: Implement Reaction Executor

Create file: `server/src/services/[service-name]/reactions.ts`

```typescript
import axios from 'axios';

export class ServiceReactionExecutor {
  constructor(private accessToken: string) {}

  async executeReactionName(
    parameters: any,
    actionData?: any
  ): Promise<any> {
    // Merge action data into parameters if mapping is defined
    const finalParams = {
      ...parameters,
      title: parameters.title || actionData?.title
    };

    const response = await axios.post(
      'https://api.service.com/endpoint',
      finalParams,
      {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      }
    );

    return {
      success: true,
      externalId: response.data.id,
      timestamp: new Date()
    };
  }
}
```

### Step 7: Register Service

Update `server/src/services/index.ts`:

```typescript
import { googleService } from './google';
import { githubService } from './github';
import { [serviceName]Service } from './[service-name]';

export const AVAILABLE_SERVICES = [
  googleService,
  githubService,
  [serviceName]Service,
  // ... more services
];
```

### Step 8: Add OAuth Route

Update `server/src/routes/auth.ts`:

```typescript
router.get('/oauth/service/callback', async (req, res) => {
  const { code, state } = req.query;

  try {
    const oauthHandler = new ServiceOAuthHandler();
    const tokens = await oauthHandler.exchangeCodeForToken(code);
    const userInfo = await oauthHandler.getUserInfo(tokens.accessToken);

    // Save to connected_services table
    // Create/update user OAuth provider

    res.json({ success: true, accessToken: tokens.accessToken });
  } catch (error) {
    res.status(401).json({ error: 'OAuth failed' });
  }
});
```

### Step 9: Webhook Handler (if applicable)

Create file: `server/src/webhooks/[service-name].ts`

```typescript
export async function handleServiceWebhook(req: Request, res: Response) {
  // Verify webhook signature
  const signature = req.headers['x-service-signature'];
  if (!verifySignature(req.body, signature)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Find matching workflows
  const workflows = await findWorkflowsWithTrigger('service.actionName', req.body);

  // Execute workflows
  for (const workflow of workflows) {
    await executeWorkflow(workflow, req.body);
  }

  res.json({ success: true });
}
```

## Service Parameter Types

### Basic Types
```typescript
'string'   // Text input
'number'   // Numeric input
'boolean'  // Checkbox
'date'     // Date/Time picker
```

### Complex Types
```typescript
'select'     // Dropdown with options
'textarea'   // Multi-line text
'email'      // Email validation
'url'        // URL validation
```

## Data Mapping

Map output from Actions to Reaction inputs:

```typescript
{
  name: 'message',
  type: 'textarea',
  required: true,
  mapFromTrigger: 'emailBody'  // Gets emailBody from action output
}
```

## Testing Your Service

### Unit Tests

Create file: `server/src/services/__tests__/[service-name].test.ts`

```typescript
import { [serviceName]Service } from '../[service-name]';

describe('[Service Name]', () => {
  it('should have valid actions', () => {
    expect([serviceName]Service.actions.length).toBeGreaterThan(0);
  });

  it('should have valid reactions', () => {
    expect([serviceName]Service.reactions.length).toBeGreaterThan(0);
  });

  it('should validate OAuth config', () => {
    expect([serviceName]Service.oauthConfig).toBeDefined();
  });
});
```

### Integration Tests

```bash
npm run test:integration -- [service-name]
```

## Best Practices

1. **Security**
   - Never log tokens
   - Validate webhook signatures
   - Use environment variables for secrets
   - Encrypt sensitive data

2. **Performance**
   - Cache user info
   - Use batch operations
   - Implement rate limiting
   - Handle rate limit errors gracefully

3. **Error Handling**
   - Provide meaningful error messages
   - Retry failed operations
   - Log errors for debugging
   - Gracefully degrade

4. **Documentation**
   - Add JSDoc comments
   - Update API documentation
   - Include example usage
   - Document limitations

## Service Checklist

- [ ] Service definition created
- [ ] Actions defined (at least 1)
- [ ] Reactions defined (at least 1)
- [ ] OAuth handler implemented
- [ ] Action executor implemented
- [ ] Reaction executor implemented
- [ ] Service registered
- [ ] Route added
- [ ] Unit tests written
- [ ] Integration tests pass
- [ ] Documentation updated
- [ ] Environment variables added to `.env.example`
- [ ] PR ready for review
