import { Router, Request, Response } from 'express';
import { env } from '../config/env.js';

export const healthRouter = Router();

healthRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'AgriAssist AI Backend Service is operating normally',
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      aiModel: env.GEMINI_MODEL,
    },
  });
});

