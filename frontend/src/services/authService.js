import { apiClient } from './apiClient.js';

export const authService = {
  signup: (payload) => apiClient.post('/auth/signup', payload).then((r) => r.data),
  login: (payload) => apiClient.post('/auth/login', payload).then((r) => r.data),
  me: () => apiClient.get('/auth/me').then((r) => r.data),
  logout: () => apiClient.post('/auth/logout'),
};

