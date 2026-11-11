import { Router } from 'express';
import { AdvisoryController } from '../controllers/advisory.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { uploadImage } from '../middleware/upload.js';
import { aiEndpointRateLimiter } from '../middleware/rateLimiter.js';
import { cropRecommendationSchema } from '../schemas/crop-recommendation.schema.js';
import { fertilizerAdvisorySchema } from '../schemas/fertilizer.schema.js';
import { irrigationAdvisorySchema } from '../schemas/irrigation.schema.js';

export const advisoryRouter = Router();

advisoryRouter.use(requireAuth);

// Crop Recommendation
advisoryRouter.post(
  '/crop-recommendation',
  aiEndpointRateLimiter,
  validateRequest(cropRecommendationSchema),
  AdvisoryController.generateCropRecommendation
);
advisoryRouter.get(
  '/crop-recommendation/:id',
  AdvisoryController.getCropRecommendationById
);

// Disease Detection
advisoryRouter.post(
  '/disease-detection',
  aiEndpointRateLimiter,
  uploadImage.single('image'),
  AdvisoryController.analyzeCropDisease
);
advisoryRouter.get(
  '/disease-detection/:id',
  AdvisoryController.getDiseaseAnalysisById
);

// Fertilizer Advisory
advisoryRouter.post(
  '/fertilizer',
  aiEndpointRateLimiter,
  validateRequest(fertilizerAdvisorySchema),
  AdvisoryController.generateFertilizerAdvisory
);

// Irrigation Advisory
advisoryRouter.post(
  '/irrigation',
  aiEndpointRateLimiter,
  validateRequest(irrigationAdvisorySchema),
  AdvisoryController.generateIrrigationAdvisory
);

