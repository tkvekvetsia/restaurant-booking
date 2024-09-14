import { Router } from 'express';
import { authRouter } from './auth.route';
import { restaurantRouter } from './restaurant.route';

const router = Router();
// auth
router.use('/auth', authRouter);

// restaurants
router.use('/restaurants', restaurantRouter);

export default router;
