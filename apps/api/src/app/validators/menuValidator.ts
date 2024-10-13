import { body } from 'express-validator';

export const validateMenu = [
  body('name')
    .isString()
    .notEmpty()
    .withMessage('Name is required')
    .escape()
    .trim(),
  body('description').optional().isString().escape().trim(),
  body('restaurantId')
    .isString()
    .notEmpty()
    .withMessage('Restaurant ID is required')
    .escape()
    .trim(),
];
