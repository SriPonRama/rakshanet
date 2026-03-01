import { apiClient } from './apiClient.js';

export const resourceService = {
  create: (payload) => apiClient.post('/resources', payload).then((r) => r.data),
  list: () => apiClient.get('/resources').then((r) => r.data),
};

