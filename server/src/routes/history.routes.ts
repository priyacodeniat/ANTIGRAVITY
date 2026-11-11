import { Router } from 'express';
import { HistoryController } from '../controllers/history.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

export const historyRouter = Router();

historyRouter.use(requireAuth);

historyRouter.get('/', HistoryController.getHistory);
historyRouter.get('/:id', HistoryController.getHistoryById);
historyRouter.delete('/:id', HistoryController.deleteHistory);

