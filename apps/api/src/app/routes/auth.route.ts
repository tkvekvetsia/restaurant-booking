import { Router } from 'express';
import { validateLogin, validateRegistration } from '../validators';
import {
  login,
  registerUserAsBusiness,
  registerUser,
  loginAsBusiness,
} from '../handlers';
import { catchAsync } from '../utils';

const router = Router();

// customer
router.post('/register', validateRegistration, catchAsync(registerUser));
router.post('/login', validateLogin, catchAsync(login));

// admin
router.post(
  'business/register',
  validateRegistration,
  catchAsync(registerUserAsBusiness)
);
router.post('/business/login', validateLogin, catchAsync(loginAsBusiness));

export { router as authRouter };
