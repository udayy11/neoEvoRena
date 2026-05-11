import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth token to every request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('neo_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth
export const authAPI = {
  signup: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/signup', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
};

// Destinations
export const destinationsAPI = {
  getAll: (featured?: boolean) =>
    api.get('/destinations', { params: featured ? { featured: 'true' } : {} }),
  getById: (id: string) => api.get(`/destinations/${id}`),
};

// Bookings
export const bookingsAPI = {
  getAll: () => api.get('/bookings'),
  create: (data: {
    destination: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
    seatClass: string;
    totalPrice: number;
  }) => api.post('/bookings', data),
  cancel: (id: string) => api.delete(`/bookings/${id}`),
};

export default api;
