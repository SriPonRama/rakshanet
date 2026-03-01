import { apiClient } from './apiClient.js';

export const aiService = {
  predictRisk: (payload) => apiClient.post('/ai/predict-risk', payload).then((r) => r.data),
  analyzeImage: (payload) => apiClient.post('/ai/analyze-image', payload).then((r) => r.data),
};

