import { Router } from 'express';
import { validateRegistration } from '../validators/registrationValidator';
import { registerUser } from '../handlers';
import { catchAsync } from '../utils';

const router = Router();

router.post('/register', validateRegistration, catchAsync(registerUser));
router.get('/login', (req, res) => {
  res.send('Login page');
});

export { router as authRouter };
