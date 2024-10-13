import { Router } from 'express';
import { authorizationMiddleware, isBusiness } from '../middlewares';
import { catchAsync } from '../utils';
import {
  createMenu,
  deleteMenu,
  getMenuById,
  getMenusByRestaurantId,
  updateMenu,
} from '../handlers';
import { validateMenu } from '../validators/menuValidator';

const router = Router();

router.get('/byRestaurantId/:restaurantId', catchAsync(getMenusByRestaurantId));
router.get('/:id', catchAsync(getMenuById));

// for business
router.post(
  '/',
  [authorizationMiddleware, isBusiness, ...validateMenu],
  catchAsync(createMenu)
);

router.delete(
  '/:id',
  [authorizationMiddleware, isBusiness],
  catchAsync(deleteMenu)
);
router.put(
  '/:id',
  [authorizationMiddleware, isBusiness],
  catchAsync(updateMenu)
);
export { router as menuRouter };
