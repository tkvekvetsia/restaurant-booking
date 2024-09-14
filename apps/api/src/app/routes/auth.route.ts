import { Router } from 'express';
import { validateLogin, validateRegistration } from '../validators';
import { login, registerUser } from '../handlers';
import { catchAsync } from '../utils';

const router = Router();

router.post('/register', validateRegistration, catchAsync(registerUser));
router.post('/login', validateLogin, catchAsync(login));

export { router as authRouter };
