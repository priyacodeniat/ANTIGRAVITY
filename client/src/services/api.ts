import axios from 'axios';
import { supabase } from './supabase.js';
import {
  mockCropRecommendation,
  mockDiseaseDiagnosis,
  mockFertilizerAdvisory,
  mockIrrigationAdvisory,
  mockChatResponse,
} from './mockData.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to inject active Supabase bearer token
apiClient.interceptors.request.use(async (config) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
  } catch (err) {
    console.warn('Could not attach session token to request:', err);
  }
  return config;
});

// Response interceptor with graceful demo fallback for local evaluation
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    const url = config?.url || '';

    // If backend connection fails (network error, refused, offline), provide interactive simulated response
    const isNetworkError = !error.response || error.code === 'ERR_NETWORK' || error.message?.includes('Network Error');

    if (isNetworkError) {
      console.warn(`[AgriAssist Demo Mode] Backend unavailable at ${url}. Providing interactive simulation response.`);

      // Simulated network latency
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (url.includes('/advisory/crop-recommendation')) {
        return {
          status: 200,
          data: {
            success: true,
            message: 'Crop recommendations generated (Demo Simulation)',
            data: { result: mockCropRecommendation },
          },
        };
      }

      if (url.includes('/advisory/disease-detection')) {
        return {
          status: 200,
          data: {
            success: true,
            message: 'Crop image disease analysis completed (Demo Simulation)',
            data: { result: mockDiseaseDiagnosis },
          },
        };
      }

      if (url.includes('/advisory/fertilizer')) {
        return {
          status: 200,
          data: {
            success: true,
            message: 'Fertilizer advisory generated (Demo Simulation)',
            data: { result: mockFertilizerAdvisory },
          },
        };
      }

      if (url.includes('/advisory/irrigation')) {
        return {
          status: 200,
          data: {
            success: true,
            message: 'Irrigation advisory generated (Demo Simulation)',
            data: { result: mockIrrigationAdvisory },
          },
        };
      }

      if (url.includes('/chat')) {
        return {
          status: 200,
          data: {
            success: true,
            message: 'Message processed (Demo Simulation)',
            data: {
              conversationId: 'demo-conversation-id',
              response: mockChatResponse,
            },
          },
        };
      }

      if (url.includes('/history')) {
        return {
          status: 200,
          data: {
            success: true,
            message: 'History loaded (Demo Simulation)',
            data: {
              items: [
                {
                  id: 'demo-hist-1',
                  user_id: 'demo-user',
                  advisory_type: 'crop_recommendation',
                  request_data: { state: 'Maharashtra', crop: 'Soybean' },
                  response_data: mockCropRecommendation,
                  ai_model: 'gemini-2.5-flash',
                  status: 'completed',
                  created_at: new Date(Date.now() - 3600000).toISOString(),
                },
                {
                  id: 'demo-hist-2',
                  user_id: 'demo-user',
                  advisory_type: 'disease_detection',
                  request_data: { cropName: 'Tomato' },
                  response_data: mockDiseaseDiagnosis,
                  ai_model: 'gemini-2.5-flash',
                  status: 'completed',
                  created_at: new Date(Date.now() - 86400000).toISOString(),
                },
              ],
              pagination: { page: 1, pageSize: 10, totalItems: 2, totalPages: 1 },
            },
          },
        };
      }

      if (url.includes('/profile')) {
        return {
          status: 200,
          data: {
            success: true,
            message: 'Profile retrieved (Demo Simulation)',
            data: {
              id: '00000000-0000-0000-0000-000000000001',
              full_name: 'Ramesh Patel',
              phone: '+91 98765 43210',
              state: 'Maharashtra',
              district: 'Nashik',
              village: 'Dindori',
              preferred_language: 'en',
              land_area: 5,
              land_area_unit: 'acre',
              soil_type: 'Black Soil',
              irrigation_availability: 'Drip & Borewell',
              farming_experience: '12 years',
            },
          },
        };
      }
    }

    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.details ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);
