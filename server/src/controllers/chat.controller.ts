import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { ChatService } from '../services/chatbot/chat.service.js';
import { supabaseAdmin } from '../config/supabase.js';

export class ChatController {
  static async sendMessage(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const result = await ChatService.processMessage(userId, req.body);

      res.status(200).json({
        success: true,
        message: 'Message processed successfully',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getConversations(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;

      const { data, error } = await supabaseAdmin
        .from('chat_conversations')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) {
        throw error;
      }

      res.status(200).json({
        success: true,
        message: 'Conversations retrieved successfully',
        data: data || [],
      });
    } catch (err) {
      next(err);
    }
  }

  static async getConversationMessages(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      // Verify conversation ownership
      const { data: conv, error: convErr } = await supabaseAdmin
        .from('chat_conversations')
        .select('id')
        .eq('id', id)
        .eq('user_id', userId)
        .single();

      if (convErr || !conv) {
        res.status(404).json({
          success: false,
          message: 'Conversation not found or unauthorized access',
          error: { code: 'NOT_FOUND' },
        });
        return;
      }

      // Fetch messages
      const { data: messages, error: msgErr } = await supabaseAdmin
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', id)
        .order('created_at', { ascending: true });

      if (msgErr) {
        throw msgErr;
      }

      res.status(200).json({
        success: true,
        message: 'Conversation messages retrieved',
        data: messages || [],
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteConversation(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const { error } = await supabaseAdmin
        .from('chat_conversations')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      res.status(200).json({
        success: true,
        message: 'Conversation deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  }
}

