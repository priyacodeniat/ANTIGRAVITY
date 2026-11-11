import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase.js';

export class CropCatalogController {
  static async getCatalog(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const category = req.query.category as string | undefined;
      const search = req.query.search as string | undefined;

      let query = supabaseAdmin
        .from('crop_catalog')
        .select('*')
        .eq('is_active', true)
        .order('crop_name', { ascending: true });

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      if (search) {
        query = query.ilike('crop_name', `%${search}%`);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      res.status(200).json({
        success: true,
        message: 'Crop catalog retrieved successfully',
        data: data || [],
      });
    } catch (err) {
      next(err);
    }
  }
}

