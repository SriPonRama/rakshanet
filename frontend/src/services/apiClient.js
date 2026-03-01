import axios from 'axios';
import { API_BASE_URL } from '../utils/constants.js';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Let caller decide how to handle unauthenticated state
    }
    return Promise.reject(error);
  },
);

