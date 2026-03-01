import { apiClient } from './apiClient.js';

export const adminService = {
  listUsers: () => apiClient.get('/admin/users').then((r) => r.data),
  updateUserRole: (id, role) =>
    apiClient.patch(`/admin/users/${id}/role`, { role }).then((r) => r.data),
  listModerationIncidents: () => apiClient.get('/admin/incidents').then((r) => r.data),
};

