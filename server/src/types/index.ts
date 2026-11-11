import { Request } from 'express';
import { User } from '@supabase/supabase-js';

export interface AuthenticatedUser {
  id: string;
  email?: string;
  phone?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
  supabaseUser?: User;
}

export type AdvisoryType =
  | 'crop_recommendation'
  | 'disease_detection'
  | 'fertilizer_advisory'
  | 'irrigation_advisory';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code: string;
    details?: unknown;
  };
}

