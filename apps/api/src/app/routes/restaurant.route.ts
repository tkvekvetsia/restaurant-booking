import { Router } from 'express';
import { validateCreateRestaurant, validateGetRestaurant } from '../validators';
import {
  createRestaurant,
  deleteRestaurantById,
  getRestaurantById,
  getRestaurants,
} from '../handlers';
import { catchAsync } from '../utils';
import { param } from 'express-validator';
import { authorizationMiddleware } from '../middlewares';

const router = Router();

router.get('/', validateGetRestaurant, catchAsync(getRestaurants));

router.post(
  '/',
  [authorizationMiddleware, ...validateCreateRestaurant],
  catchAsync(createRestaurant)
);

router.get('/:id', param('id').trim(), catchAsync(getRestaurantById));

router.delete(
  '/:id',
  [authorizationMiddleware, param('id').trim()],
  catchAsync(deleteRestaurantById)
);

export { router as restaurantRouter };
