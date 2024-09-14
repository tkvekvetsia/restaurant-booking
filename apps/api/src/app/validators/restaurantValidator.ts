import { body } from 'express-validator';
import { authorizationMiddleware, handleValidation } from '../middlewares';
// Custom validator to validate time format
const isValidTimeFormat = value => {
  const timeFormat = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
  return timeFormat.test(value);
};

// Custom validator to validate the structure of openingHours
const validateOpeningHoursStructure = value => {
  if (typeof value !== 'object' || value === null) {
    throw new Error('openingHours must be a valid JSON object');
  }

  // Days of the week
  const validDays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  // Check each day
  for (const day of validDays) {
    const dayHours = value[day];

    if (!Array.isArray(dayHours)) {
      throw new Error(`${day} should be an array`);
    }

    // Validate each opening period for the day
    for (const period of dayHours) {
      if (typeof period.open !== 'string' || !isValidTimeFormat(period.open)) {
        throw new Error(
          `Invalid 'open' time for ${day}. Expected format HH:mm`
        );
      }
      if (
        typeof period.close !== 'string' ||
        !isValidTimeFormat(period.close)
      ) {
        throw new Error(
          `Invalid 'close' time for ${day}. Expected format HH:mm`
        );
      }
    }
  }

  return true;
};

export const validateCreateRestaurant = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name should be a string')
    .escape(),
  body('description')
    .optional()
    .trim()
    .isString()
    .withMessage('Description should be a string')
    .escape(),
  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required')
    .isString()
    .withMessage('Address should be a string')
    .escape(),
  body('city')
    .optional()
    .trim()
    .isString()
    .withMessage('City should be a string')
    .escape(),
  body('state')
    .optional()
    .trim()
    .isString()
    .withMessage('State should be a string')
    .escape(),
  body('postalCode')
    .optional()
    .trim()
    .isString()
    .withMessage('Postal code should be a string')
    .escape(),
  body('latitude')
    .notEmpty()
    .withMessage('Latitude is required')
    .isFloat()
    .withMessage('Latitude should be a float'),
  body('longitude')
    .notEmpty()
    .withMessage('Longitude is required')
    .isFloat()
    .withMessage('Longitude should be a float'),
  body('phone')
    .notEmpty()
    .withMessage('Phone is Required')
    .trim()
    .isString()
    .withMessage('Phone should be a string')
    .isMobilePhone('ka-GE')
    .withMessage('Invalid phone number')
    .escape(),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email')
    .escape(),
  body('openingHours')
    .notEmpty()
    .withMessage('Opening hours is required')
    .isObject()
    .withMessage('Opening hours should be an object'),
  body('capacity')
    .notEmpty()
    .withMessage('Capacity is required')
    .isInt()
    .withMessage('Capacity should be an integer'),
  body('openingHours')
    .custom(validateOpeningHoursStructure)
    .withMessage('Invalid openingHours format'),
  handleValidation([]),
];
