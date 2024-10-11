import { Router } from 'express';
import { validateLogin, validateRegistration } from '../validators';
import { catchAsync } from '../utils';
import { loginAsBusiness, registerUserAsBusiness } from '../handlers';

const router = Router();
// admin
router.post(
  '/register',
  validateRegistration,
  catchAsync(registerUserAsBusiness)
);
router.post('/login', validateLogin, catchAsync(loginAsBusiness));

export { router as businessAuthRouter };
