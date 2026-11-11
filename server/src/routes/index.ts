import { Router } from 'express';
import { healthRouter } from './health.routes.js';
import { profileRouter } from './profile.routes.js';
import { advisoryRouter } from './advisory.routes.js';
import { chatRouter } from './chat.routes.js';
import { historyRouter } from './history.routes.js';
import { cropsRouter } from './crops.routes.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/profile', profileRouter);
apiRouter.use('/advisory', advisoryRouter);
apiRouter.use('/chat', chatRouter);
apiRouter.use('/history', historyRouter);
apiRouter.use('/crops', cropsRouter);

