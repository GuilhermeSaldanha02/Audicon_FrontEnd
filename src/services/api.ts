import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 15000,
});

// You can add interceptors here if needed
// api.interceptors.request.use((config) => config);
// api.interceptors.response.use((response) => response, (error) => Promise.reject(error));