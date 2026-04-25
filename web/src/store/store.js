import { create } from 'zustand';

// Auth Store
export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('accessToken') || null,
  
  login: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', token);
    set({ user, token });
  },
  
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    set({ user: null, token: null });
  },
  
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  }
}));

// Notifications Store
export const useNotificationStore = create((set, get) => ({
  notifications: [],
  seenApiNotificationIds: [],
  
  addNotification: (notification) => {
    const id = Date.now();
    const newNotification = { ...notification, id, createdAt: new Date() };
    set((state) => ({ notifications: [newNotification, ...state.notifications] }));
    
    // Auto remove after 5 seconds if no action
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      }));
    }, 5000);
    
    return id;
  },
  
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }));
  },
  
  clearNotifications: () => {
    set({ notifications: [] });
  },

  markApiNotificationSeen: (id) => {
    if (get().seenApiNotificationIds.includes(id)) {
      return;
    }

    set((state) => ({
      seenApiNotificationIds: [...state.seenApiNotificationIds, id]
    }));
  }
}));

// Services Store
export const useServicesStore = create((set) => ({
  services: [],
  connectedServices: [],
  loading: false,
  
  setServices: (services) => set({ services }),
  setConnectedServices: (services) => set({ connectedServices }),
  setLoading: (loading) => set({ loading }),
  
  addConnectedService: (service) => {
    set((state) => ({
      connectedServices: [...state.connectedServices, service]
    }));
  },
  
  removeConnectedService: (serviceId) => {
    set((state) => ({
      connectedServices: state.connectedServices.filter(s => s.serviceId !== serviceId)
    }));
  }
}));

// Workflows Store
export const useWorkflowsStore = create((set) => ({
  workflows: [],
  loading: false,
  
  setWorkflows: (workflows) => set({ workflows }),
  setLoading: (loading) => set({ loading }),
  
  addWorkflow: (workflow) => {
    set((state) => ({
      workflows: [...state.workflows, workflow]
    }));
  },
  
  updateWorkflow: (id, updates) => {
    set((state) => ({
      workflows: state.workflows.map(w => w.id === id ? { ...w, ...updates } : w)
    }));
  },
  
  removeWorkflow: (id) => {
    set((state) => ({
      workflows: state.workflows.filter(w => w.id !== id)
    }));
  }
}));
