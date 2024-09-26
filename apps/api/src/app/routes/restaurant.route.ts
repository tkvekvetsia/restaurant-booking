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
import { isBusiness } from '../middlewares/isBusiness.middleware';

const router = Router();

// routes for customer

router.get('/', validateGetRestaurant, catchAsync(getRestaurants));
router.get('/:id', param('id').trim(), catchAsync(getRestaurantById));

// routes for business owner
router.post(
  '/',
  [authorizationMiddleware, isBusiness, ...validateCreateRestaurant],
  catchAsync(createRestaurant)
);

router.delete(
  '/:id',
  [authorizationMiddleware, isBusiness, param('id').trim()],
  catchAsync(deleteRestaurantById)
);

export { router as restaurantRouter };
