import { Router } from 'express';
import { authorizationMiddleware } from '../middlewares';
import { getUser } from '../handlers';
import { catchAsync } from '../utils';

const router = Router();

router.get('/', authorizationMiddleware, catchAsync(getUser));

export { router as userRouter };
