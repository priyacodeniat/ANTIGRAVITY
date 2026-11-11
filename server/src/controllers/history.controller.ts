import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { supabaseAdmin } from '../config/supabase.js';

export class HistoryController {
  static async getHistory(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize as string) || 10));
      const advisoryType = req.query.advisoryType as string | undefined;

      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabaseAdmin
        .from('advisory_history')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (advisoryType) {
        query = query.eq('advisory_type', advisoryType);
      }

      const { data, count, error } = await query;

      if (error) {
        throw error;
      }

      res.status(200).json({
        success: true,
        message: 'Advisory history retrieved successfully',
        data: {
          items: data || [],
          pagination: {
            page,
            pageSize,
            totalItems: count || 0,
            totalPages: Math.ceil((count || 0) / pageSize),
          },
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async getHistoryById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const { data, error } = await supabaseAdmin
        .from('advisory_history')
        .select('*')
        .eq('id', id)
        .eq('user_id', userId)
        .single();

      if (error || !data) {
        res.status(404).json({
          success: false,
          message: 'Advisory record not found',
          error: { code: 'NOT_FOUND' },
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Advisory record retrieved successfully',
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteHistory(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const { error } = await supabaseAdmin
        .from('advisory_history')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      res.status(200).json({
        success: true,
        message: 'Advisory record deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  }
}

