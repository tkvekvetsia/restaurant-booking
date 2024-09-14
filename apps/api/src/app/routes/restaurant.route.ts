import { Router } from 'express';
import { validateCreateRestaurant } from '../validators';
import {
  createRestaurant,
  deleteRestaurantById,
  getRestaurantById,
} from '../handlers';
import { catchAsync } from '../utils';
import { param } from 'express-validator';
import { authorizationMiddleware } from '../middlewares';

const router = Router();

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
