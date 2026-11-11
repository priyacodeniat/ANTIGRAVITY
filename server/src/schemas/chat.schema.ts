import { z } from 'zod';

export const chatMessageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(3000),
  conversationId: z.string().uuid().optional().nullable(),
  language: z.enum(['en', 'hi', 'kn', 'te', 'ta', 'ml', 'mr']).default('en'),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;

