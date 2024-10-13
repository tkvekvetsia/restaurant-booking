import { Router } from 'express';
import { authorizationMiddleware, isBusiness } from '../middlewares';
import { catchAsync } from '../utils';
import { createMenu, getMenusByRestaurantId } from '../handlers';
import { validateMenu } from '../validators/menuValidator';

const router = Router();

router.get('/byRestaurantId/:restaurantId', catchAsync(getMenusByRestaurantId));
// for business
router.post(
  '/',
  [authorizationMiddleware, isBusiness, ...validateMenu],
  catchAsync(createMenu)
);

export { router as menuRouter };
