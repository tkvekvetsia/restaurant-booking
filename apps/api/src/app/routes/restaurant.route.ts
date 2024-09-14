import { Router } from 'express';
import { validateCreateRestaurant } from '../validators';
import { createRestaurant } from '../handlers/restaurant.handler';
import { catchAsync } from '../utils';

const router = Router();

router.post('/', validateCreateRestaurant, catchAsync(createRestaurant));

export { router as restaurantRouter };
