import { Request, Response, NextFunction } from 'express';
import { AppError, logger } from '../utils';
import { environment } from '../config/environment';

// Global error handler middleware
export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error details
  logger.error(err.message);

  // Custom error handling
  if (err instanceof AppError) {
    const errorRes = {
      status: err.statusCode,
      message: err.message,
      data: null,
    };

    if (environment.environment === 'development') {
      errorRes['stackTrace'] = err.stack;
      errorRes['err'] = err;
    }

    return res.status(err.statusCode).json(errorRes);
  }

  // Generic error handling (500)

  res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
    stack: err.stack,
  });
};
