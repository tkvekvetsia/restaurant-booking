import { FieldValidationError, validationResult } from 'express-validator';

export const handleValidation =
  (removeValues: string[] = []) =>
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errArr = errors.array();
      if (removeValues.length > 0) {
        errArr.map((err: FieldValidationError) => {
          if (removeValues.includes(err.path)) delete err.value;
        });
      }
      return res.status(400).json({
        status: 'fail',
        message: 'Validation Error',
        errors: errArr,
      });
    }
    next();
  };
