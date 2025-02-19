import axios from 'axios';
import { redirect } from 'next/navigation';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Check if we're in the browser
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      } else {
        // Handle server-side redirect
        redirect('/login');
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: { email: string; password: string; name?: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};

export const noteApi = {
  getAll: async () => {
    const response = await api.get('/notes');
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  create: async (data: { title: string; content: string }) => {
    const response = await api.post('/notes', data);
    return response.data;
  },

  update: async (id: string, data: { title: string; content: string }) => {
    const response = await api.put(`/notes/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },
};

export default api; 