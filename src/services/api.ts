import { API_ENDPOINTS } from '../utils/constants';
import { ApiResponse } from '../types';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Basic fetch wrapper with error handling
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('API request failed:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

// Authentication API calls
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiRequest(API_ENDPOINTS.AUTH + '/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  logout: async () => {
    return apiRequest(API_ENDPOINTS.AUTH + '/logout', {
      method: 'POST',
    });
  },
  
  validateToken: async (token: string) => {
    return apiRequest(API_ENDPOINTS.AUTH + '/validate', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// Content API calls
export const contentAPI = {
  getYoutubeData: async () => {
    return apiRequest(API_ENDPOINTS.CONTENT + '/youtube');
  },
  
  getPodcastData: async () => {
    return apiRequest(API_ENDPOINTS.CONTENT + '/podcast');
  },
};

// Newsletter API calls
export const newsletterAPI = {
  subscribe: async (email: string) => {
    return apiRequest(API_ENDPOINTS.NEWSLETTER + '/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};