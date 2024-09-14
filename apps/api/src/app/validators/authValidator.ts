import { body } from 'express-validator';
import { handleValidation } from '../middlewares';

const hasUppercase = value => {
  return /[A-Z]/.test(value);
};

const emailValidator = body('email')
  .trim()
  .notEmpty()
  .withMessage('Email is required')
  .isEmail()
  .withMessage('Invalid email')
  .escape();

export const validateRegistration = [
  body('name')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Name is required')
    .escape(),
  emailValidator,
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 32 })
    .withMessage('Password must be between 8 and 32 characters')
    .custom(hasUppercase)
    .withMessage('Password must contain at least one uppercase letter')
    .escape(),
  body('confirmPassword')
    .trim()
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
    .escape(),
  body('phone')
    .trim()
    .isMobilePhone(['ka-GE'])
    .withMessage('Invalid phone number')
    .optional({ nullable: true })
    .escape(),
  handleValidation(['password', 'confirmPassword']),
];

export const validateLogin = [
  emailValidator,
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .escape(),
  handleValidation([]),
];
