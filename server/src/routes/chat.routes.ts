import { Router } from 'express';
import { ChatController } from '../controllers/chat.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { aiEndpointRateLimiter } from '../middleware/rateLimiter.js';
import { chatMessageSchema } from '../schemas/chat.schema.js';

export const chatRouter = Router();

chatRouter.use(requireAuth);

chatRouter.post('/', aiEndpointRateLimiter, validateRequest(chatMessageSchema), ChatController.sendMessage);
chatRouter.get('/conversations', ChatController.getConversations);
chatRouter.get('/conversations/:id', ChatController.getConversationMessages);
chatRouter.delete('/conversations/:id', ChatController.deleteConversation);

