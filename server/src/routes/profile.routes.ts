import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { updateProfileSchema } from '../schemas/profile.schema.js';

export const profileRouter = Router();

profileRouter.use(requireAuth);

profileRouter.get('/', ProfileController.getProfile);
profileRouter.put('/', validateRequest(updateProfileSchema), ProfileController.updateProfile);

