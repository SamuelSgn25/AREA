/**
 * POST /api/auth/register
 * Register a new user
 */
export const authControllers = {
  register: {
    endpoint: 'POST /api/auth/register',
    description: 'Register a new user account',
    body: {
      email: 'string (required)',
      username: 'string (required)',
      password: 'string (required, min 8 chars)',
      firstName: 'string (required)',
      lastName: 'string (required)'
    },
    response: {
      success: 'boolean',
      data: {
        id: 'string',
        email: 'string',
        username: 'string',
        createdAt: 'timestamp'
      },
      message: 'string'
    }
  },

  /**
   * POST /api/auth/login
   * User login with email/password
   */
  login: {
    endpoint: 'POST /api/auth/login',
    description: 'Authenticate user with credentials',
    body: {
      email: 'string (required)',
      password: 'string (required)'
    },
    response: {
      success: 'boolean',
      data: {
        accessToken: 'string',
        refreshToken: 'string',
        user: {
          id: 'string',
          email: 'string',
          username: 'string'
        }
      }
    }
  },

  /**
   * POST /api/auth/oauth/:provider
   * OAuth2 callback
   */
  oauthCallback: {
    endpoint: 'POST /api/auth/oauth/:provider',
    description: 'OAuth2 authentication callback',
    params: {
      provider: 'string (google|github|twitter|discord)'
    },
    body: {
      code: 'string (required)',
      state: 'string (required)'
    }
  },

  /**
   * POST /api/auth/refresh
   * Refresh access token
   */
  refresh: {
    endpoint: 'POST /api/auth/refresh',
    description: 'Get new access token using refresh token',
    body: {
      refreshToken: 'string (required)'
    }
  }
};

/**
 * User Management Endpoints
 */
export const userControllers = {
  /**
   * GET /api/users/me
   * Get current user profile
   */
  getProfile: {
    endpoint: 'GET /api/users/me',
    description: 'Get authenticated user profile',
    auth: 'required',
    response: {
      success: 'boolean',
      data: {
        id: 'string',
        email: 'string',
        username: 'string',
        firstName: 'string',
        lastName: 'string',
        avatar: 'string|null',
        role: 'user|admin',
        isVerified: 'boolean',
        createdAt: 'timestamp'
      }
    }
  },

  /**
   * PUT /api/users/me
   * Update user profile
   */
  updateProfile: {
    endpoint: 'PUT /api/users/me',
    description: 'Update authenticated user profile',
    auth: 'required',
    body: {
      firstName: 'string (optional)',
      lastName: 'string (optional)',
      avatar: 'string (optional)'
    }
  },

  /**
   * GET /api/users (Admin)
   * List all users
   */
  listUsers: {
    endpoint: 'GET /api/users',
    description: 'Get list of all users (Admin only)',
    auth: 'required',
    admin: true,
    query: {
      page: 'number (default: 1)',
      pageSize: 'number (default: 20)',
      search: 'string (optional)'
    }
  }
};

/**
 * Services Integration Endpoints
 */
export const serviceControllers = {
  /**
   * GET /api/services
   * Get available services
   */
  listServices: {
    endpoint: 'GET /api/services',
    description: 'Get list of available services',
    auth: 'required',
    response: {
      success: 'boolean',
      data: [
        {
          id: 'string',
          name: 'string',
          description: 'string',
          icon: 'string',
          category: 'string',
          authentication: 'oauth2|api_key|webhook|none',
          actions: 'array',
          reactions: 'array'
        }
      ]
    }
  },

  /**
   * GET /api/services/:id
   * Get service details
   */
  getService: {
    endpoint: 'GET /api/services/:id',
    description: 'Get service details with actions and reactions',
    auth: 'required'
  },

  /**
   * POST /api/services/:id/connect
   * Connect user account to service
   */
  connect: {
    endpoint: 'POST /api/services/:id/connect',
    description: 'Connect user account to a service',
    auth: 'required',
    body: {
      code: 'string (OAuth code)',
      state: 'string (OAuth state)'
    }
  },

  /**
   * DELETE /api/services/:id/disconnect
   * Disconnect service
   */
  disconnect: {
    endpoint: 'DELETE /api/services/:id/disconnect',
    description: 'Disconnect a service from user account',
    auth: 'required'
  }
};

/**
 * AREA (Workflow) Endpoints
 */
export const areaControllers = {
  /**
   * GET /api/workflows
   * List user workflows
   */
  list: {
    endpoint: 'GET /api/workflows',
    description: 'Get all workflows for authenticated user',
    auth: 'required',
    query: {
      page: 'number',
      pageSize: 'number',
      status: 'active|inactive|all'
    }
  },

  /**
   * POST /api/workflows
   * Create workflow
   */
  create: {
    endpoint: 'POST /api/workflows',
    description: 'Create a new AREA workflow',
    auth: 'required',
    body: {
      name: 'string (required)',
      description: 'string (optional)',
      trigger: {
        actionId: 'string',
        serviceId: 'string',
        parameters: 'object'
      },
      reactions: [
        {
          reactionId: 'string',
          serviceId: 'string',
          parameters: 'object',
          order: 'number'
        }
      ]
    }
  },

  /**
   * GET /api/workflows/:id
   * Get workflow details
   */
  get: {
    endpoint: 'GET /api/workflows/:id',
    description: 'Get specific workflow details'
  },

  /**
   * PUT /api/workflows/:id
   * Update workflow
   */
  update: {
    endpoint: 'PUT /api/workflows/:id',
    description: 'Update a workflow',
    auth: 'required'
  },

  /**
   * DELETE /api/workflows/:id
   * Delete workflow
   */
  delete: {
    endpoint: 'DELETE /api/workflows/:id',
    description: 'Delete a workflow',
    auth: 'required'
  },

  /**
   * POST /api/workflows/:id/trigger
   * Manual workflow trigger (for testing)
   */
  trigger: {
    endpoint: 'POST /api/workflows/:id/trigger',
    description: 'Manually trigger a workflow for testing',
    auth: 'required'
  }
};
