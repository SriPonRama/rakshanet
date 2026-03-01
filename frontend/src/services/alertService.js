import { apiClient } from './apiClient.js';

export const alertService = {
  create: (payload) => apiClient.post('/alerts', payload).then((r) => r.data),
  list: () => apiClient.get('/alerts').then((r) => r.data),
};

