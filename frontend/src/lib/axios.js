import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  // List of public endpoints that don't need authentication
  const publicEndpoints = ['/courses', '/categories', '/blog', '/contact'];
  
  // Check if the URL (path only) matches any public endpoint
  const url = config.url || '';
  const isPublicEndpoint = publicEndpoints.some(endpoint => {
    // Check if URL starts with the endpoint and doesn't include /admin/
    return url.startsWith(endpoint) && !url.includes('/admin/');
  });
  
  // Only add auth header if we have a token and it's not a public endpoint
  if (token && !isPublicEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect to login if we have a token (user was authenticated but token expired)
      const token = localStorage.getItem('token');
      if (token) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Don't redirect if it's a public endpoint (shouldn't happen now, but just in case)
        const publicEndpoints = ['/courses', '/categories', '/blog', '/contact'];
        const url = error.config?.url || '';
        const isPublicEndpoint = publicEndpoints.some(endpoint => 
          url.startsWith(endpoint)
        );
        
        if (!isPublicEndpoint) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
