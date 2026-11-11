import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { CropAdvisoryService } from '../services/advisory/crop.service.js';
import { DiseaseAdvisoryService } from '../services/advisory/disease.service.js';
import { FertilizerAdvisoryService } from '../services/advisory/fertilizer.service.js';
import { IrrigationAdvisoryService } from '../services/advisory/irrigation.service.js';
import { diseaseDetectionSchema } from '../schemas/disease-detection.schema.js';
import { supabaseAdmin } from '../config/supabase.js';

export class AdvisoryController {
  static async generateCropRecommendation(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user!.id;
      const result = await CropAdvisoryService.generate(userId, req.body);

      res.status(200).json({
        success: true,
        message: 'Crop recommendations generated successfully',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getCropRecommendationById(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const { data, error } = await supabaseAdmin
        .from('advisory_history')
        .select('*')
        .eq('id', id)
        .eq('user_id', userId)
        .eq('advisory_type', 'crop_recommendation')
        .single();

      if (error || !data) {
        res.status(404).json({
          success: false,
          message: 'Crop recommendation advisory not found',
          error: { code: 'NOT_FOUND' },
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Advisory retrieved successfully',
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async analyzeCropDisease(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user!.id;
      const file = req.file;

      if (!file) {
        res.status(400).json({
          success: false,
          message: 'Crop image is required for disease analysis',
          error: { code: 'MISSING_FILE' },
        });
        return;
      }

      // Validate textual body fields
      const parsedBody = diseaseDetectionSchema.parse(req.body);

      const result = await DiseaseAdvisoryService.analyze(
        userId,
        parsedBody,
        file.buffer,
        file.mimetype,
        file.size
      );

      res.status(200).json({
        success: true,
        message: 'Crop image disease analysis completed',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getDiseaseAnalysisById(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const { data, error } = await supabaseAdmin
        .from('advisory_history')
        .select('*')
        .eq('id', id)
        .eq('user_id', userId)
        .eq('advisory_type', 'disease_detection')
        .single();

      if (error || !data) {
        res.status(404).json({
          success: false,
          message: 'Disease diagnosis advisory not found',
          error: { code: 'NOT_FOUND' },
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Disease diagnosis retrieved successfully',
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async generateFertilizerAdvisory(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user!.id;
      const result = await FertilizerAdvisoryService.generate(userId, req.body);

      res.status(200).json({
        success: true,
        message: 'Fertilizer advisory generated successfully',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async generateIrrigationAdvisory(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user!.id;
      const result = await IrrigationAdvisoryService.generate(userId, req.body);

      res.status(200).json({
        success: true,
        message: 'Irrigation advisory generated successfully',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

