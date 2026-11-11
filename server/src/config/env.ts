import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000').transform(Number),
  CLIENT_URL: z.string().default('http://localhost:5173'),
  SUPABASE_URL: z.string().url('SUPABASE_URL must be a valid URL'),
  SUPABASE_ANON_KEY: z.string().min(1, 'SUPABASE_ANON_KEY is required'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),
  GEMINI_API_KEY: z.string().min(1, 'GEMINI_API_KEY is required'),
  GEMINI_MODEL: z.string().default('gemini-2.5-flash'),
  MAX_IMAGE_SIZE_MB: z.string().default('8').transform(Number),
  RATE_LIMIT_WINDOW_MS: z.string().default('900000').transform(Number),
  RATE_LIMIT_MAX_REQUESTS: z.string().default('60').transform(Number),
});

const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.warn('⚠️ Environment configuration warning: Missing or invalid variables:');
      error.errors.forEach((err) => {
        console.warn(`  - ${err.path.join('.')}: ${err.message}`);
      });
      console.warn('Falling back to default development mock-safe values where applicable.');
    }
    // Return safe fallback for development setup before credentials are populated
    return {
      NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
      PORT: Number(process.env.PORT) || 5000,
      CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
      SUPABASE_URL: process.env.SUPABASE_URL || 'https://placeholder.supabase.co',
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || 'placeholder-anon-key',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key',
      GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'placeholder-gemini-key',
      GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      MAX_IMAGE_SIZE_MB: Number(process.env.MAX_IMAGE_SIZE_MB) || 8,
      RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
      RATE_LIMIT_MAX_REQUESTS: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 60,
    };
  }
};

export const env = parseEnv();

