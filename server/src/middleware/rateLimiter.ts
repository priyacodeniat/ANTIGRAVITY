import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

export const apiRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP address. Please wait a few minutes before trying again.',
    error: { code: 'RATE_LIMIT_EXCEEDED' },
  },
});

export const aiEndpointRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // 30 AI calls per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'AI advisory rate limit reached. Please wait before submitting more advisory analyses.',
    error: { code: 'AI_RATE_LIMIT_EXCEEDED' },
  },
});

