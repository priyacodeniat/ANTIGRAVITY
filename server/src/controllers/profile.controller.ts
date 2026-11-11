import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { supabaseAdmin } from '../config/supabase.js';

export class ProfileController {
  static async getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;

      const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is row not found
        throw error;
      }

      // If no profile exists yet, return default baseline
      const profile = data || {
        id: userId,
        full_name: req.user?.email?.split('@')[0] || 'Farmer',
        phone: req.user?.phone || null,
        preferred_language: 'en',
      };

      res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: profile,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const {
        fullName,
        phone,
        state,
        district,
        village,
        preferredLanguage,
        landArea,
        landAreaUnit,
        soilType,
        irrigationAvailability,
        farmingExperience,
      } = req.body;

      const { data, error } = await supabaseAdmin
        .from('profiles')
        .upsert({
          id: userId,
          full_name: fullName,
          phone: phone || null,
          state,
          district,
          village: village || null,
          preferred_language: preferredLanguage || 'en',
          land_area: landArea || null,
          land_area_unit: landAreaUnit || 'acre',
          soil_type: soilType || null,
          irrigation_availability: irrigationAvailability || null,
          farming_experience: farmingExperience || null,
          updated_at: new Date().toISOString(),
        })
        .select('*')
        .single();

      if (error) {
        throw error;
      }

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data,
      });
    } catch (err) {
      next(err);
    }
  }
}

