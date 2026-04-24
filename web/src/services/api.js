import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  getProfile: () => apiClient.get('/users/me'),
  updateProfile: (data) => apiClient.put('/users/me', data)
};

// Services API
export const servicesAPI = {
  list: () => apiClient.get('/services'),
  get: (id) => apiClient.get(`/services/${id}`),
  connect: (id, data) => apiClient.post(`/services/${id}/connect`, data),
  disconnect: (id) => apiClient.delete(`/services/${id}/disconnect`),
  listConnected: () => apiClient.get('/services/connected/list')
};

// Workflows API
export const workflowsAPI = {
  list: () => apiClient.get('/workflows'),
  create: (data) => apiClient.post('/workflows', data),
  update: (id, data) => apiClient.put(`/workflows/${id}`, data),
  delete: (id) => apiClient.delete(`/workflows/${id}`)
};

// Notifications API
export const notificationsAPI = {
  list: () => apiClient.get('/notifications'),
  create: (data) => apiClient.post('/notifications', data),
  markAsRead: (id) => apiClient.put(`/notifications/${id}/read`)
};

export default apiClient;
