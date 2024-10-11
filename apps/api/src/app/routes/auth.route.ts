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


export { router as authRouter };
