import { Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase.js';
import { AuthenticatedRequest } from '../types/index.js';

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Authentication required. Missing or malformed Bearer token.',
        error: { code: 'UNAUTHORIZED' },
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Authentication token is empty.',
        error: { code: 'UNAUTHORIZED' },
      });
      return;
    }

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired authentication session.',
        error: { code: 'INVALID_TOKEN', details: error?.message },
      });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      phone: user.phone,
    };
    req.supabaseUser = user;

    next();
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal auth error';
    res.status(500).json({
      success: false,
      message: 'Authentication verification failure',
      error: { code: 'AUTH_VERIFICATION_ERROR', details: errorMsg },
    });
  }
};

