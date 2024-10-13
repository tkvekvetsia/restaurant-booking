import { Router } from 'express';
import { authRouter } from './auth.route';
import { restaurantRouter } from './restaurant.route';
import { businessAuthRouter } from './businessAuth.route';
import { userRouter } from './user.routes';
import { menuRouter } from './menu.route';

const router = Router();
// auth
router.use('/auth', authRouter);

// restaurants
router.use('/restaurants', restaurantRouter);

// business
router.use('/business/auth', businessAuthRouter);

// user
router.use('/user', userRouter);

// menu
router.use('/menus', menuRouter);

export default router;
