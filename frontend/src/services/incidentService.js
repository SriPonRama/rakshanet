import { apiClient } from './apiClient.js';

export const incidentService = {
  create: (payload) => apiClient.post('/incidents', payload).then((r) => r.data),
  list: () => apiClient.get('/incidents').then((r) => r.data),
  get: (id) => apiClient.get(`/incidents/${id}`).then((r) => r.data),
  updateStatus: (id, payload) =>
    apiClient.patch(`/incidents/${id}/status`, payload).then((r) => r.data),
};

