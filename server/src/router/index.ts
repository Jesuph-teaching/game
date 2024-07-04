import { Router } from 'express';

import healthCheckRouter from './healthCheck/router';
import { getCards } from '@server/handlers/cards';

const router = Router();
// Routes
router.use('/health-check', healthCheckRouter);
router.get('/cards', getCards);
export default router;
