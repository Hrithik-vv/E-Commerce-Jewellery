// Centralized API helper for all backend calls
const API_BASE = '/api';

// Get auth token from localStorage
const getToken = () => localStorage.getItem('accessToken');

// Generic fetch wrapper with auth
const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = { ...options.headers };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Don't set Content-Type for FormData (browser sets it automatically with boundary)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Convenience methods
export const api = {
  get: (endpoint) => apiFetch(endpoint),
  post: (endpoint, body) =>
    apiFetch(endpoint, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  put: (endpoint, body) =>
    apiFetch(endpoint, {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  delete: (endpoint) => apiFetch(endpoint, { method: 'DELETE' }),
};

export default api;
