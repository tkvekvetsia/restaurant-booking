import { Router } from 'express';
import { authRouter } from './auth.route';
import { restaurantRouter } from './restaurant.route';
import { businessAuthRouter } from './businessAuth.route';

const router = Router();
// auth
router.use('/auth', authRouter);


// restaurants
router.use('/restaurants', restaurantRouter);

// business
router.use('/business/auth', businessAuthRouter);


export default router;
