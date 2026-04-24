// ==========================================
// User Model Interface
// ==========================================

export interface User {
  id: string;
  email: string;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  oauthProviders?: OAuthProvider[];
  connectedServices?: Service[];
}

export interface OAuthProvider {
  provider: string;
  providerId: string;
  email: string;
  name: string;
  avatar?: string;
  accessToken: string;
  refreshToken?: string;
  tokenExpiry?: Date;
}

// ==========================================
// Service Model Interface
// ==========================================

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  isActive: boolean;
  authentication: 'oauth2' | 'api_key' | 'webhook' | 'none';
  actions: Action[];
  reactions: Reaction[];
  oauthConfig?: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
}

// ==========================================
// Action Model Interface
// ==========================================

export interface Action {
  id: string;
  serviceId: string;
  name: string;
  description: string;
  trigger: string;
  parameters: ActionParameter[];
  webhook?: boolean;
  pollingInterval?: number;
}

export interface ActionParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'select';
  required: boolean;
  description: string;
  options?: { label: string; value: string }[];
  placeholder?: string;
}

// ==========================================
// Reaction Model Interface
// ==========================================

export interface Reaction {
  id: string;
  serviceId: string;
  name: string;
  description: string;
  action: string;
  parameters: ReactionParameter[];
}

export interface ReactionParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'select' | 'textarea';
  required: boolean;
  description: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  mapFromTrigger?: string; // Map from action trigger data
}

// ==========================================
// AREA (Workflow) Model Interface
// ==========================================

export interface AREA {
  id: string;
  userId: string;
  name: string;
  description?: string;
  isActive: boolean;
  trigger: AreaTrigger;
  reactions: AreaReaction[];
  filters?: Filter[];
  createdAt: Date;
  updatedAt: Date;
  executionHistory?: WorkflowExecution[];
}

export interface AreaTrigger {
  actionId: string;
  serviceId: string;
  parameters: Record<string, any>;
}

export interface AreaReaction {
  reactionId: string;
  serviceId: string;
  parameters: Record<string, any>;
  order: number;
  condition?: Filter;
}

export interface Filter {
  field: string;
  operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan' | 'startsWith' | 'endsWith';
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

// ==========================================
// Workflow Execution History
// ==========================================

export interface WorkflowExecution {
  id: string;
  areaId: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  triggeredAt: Date;
  completedAt?: Date;
  error?: string;
  executionDetails: ExecutionDetail[];
}

export interface ExecutionDetail {
  stepId: number;
  componentType: 'trigger' | 'reaction';
  componentId: string;
  status: 'success' | 'failed';
  input: Record<string, any>;
  output: Record<string, any>;
  error?: string;
  duration: number;
}

// ==========================================
// Connected Service Instance
// ==========================================

export interface ConnectedService {
  id: string;
  userId: string;
  serviceId: string;
  accountName?: string;
  accountEmail?: string;
  accountAvatar?: string;
  accessToken: string;
  refreshToken?: string;
  tokenExpiry?: Date;
  scope?: string[];
  metadata?: Record<string, any>;
  isActive: boolean;
  connectedAt: Date;
  lastUsed?: Date;
}

// ==========================================
// API Response Types
// ==========================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
  path?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
