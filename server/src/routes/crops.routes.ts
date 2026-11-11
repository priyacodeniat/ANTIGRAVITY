import { Router } from 'express';
import { CropCatalogController } from '../controllers/crops.controller.js';

export const cropsRouter = Router();

// Publicly readable crop catalog
cropsRouter.get('/', CropCatalogController.getCatalog);

