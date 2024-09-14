import { Request, Response, NextFunction } from 'express';
import { AppError, logger } from '../utils';
import { environment } from '../config/environment';
import { Prisma } from '@prisma/client';

// Global error handler middleware
export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error details
  // logger.error(err.message);

  // Custom error handling
  if (err instanceof AppError && err.isOperational) {
    const errorRes = {
      statusCode: err.statusCode,
      message: err.message,
      data: null,
      errors: err.errors || null,
    };

    console.error(err);
    if (environment.environment === 'development') {
      errorRes['stackTrace'] = err.stack;
      errorRes['err'] = err;
    }

    return res.status(err.statusCode).json(errorRes);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    let message = '';
    switch (err.code) {
      case 'P2002':
        // handling duplicate key errors
        message = `Duplicate field value: ${err.meta.target}`;
        break;
      case 'P2014':
        // handling invalid id errors
        message = `Invalid ID: ${err.meta.target}`;
        break;
      case 'P2003':
        // handling invalid data errors
        message = `Invalid input data: ${err.meta.target}`;
        break;
      case 'P2025':
        if (req.method && req.method.toUpperCase() === 'DELETE') {
          message = `${err.meta.modelName},  ${err.meta.cause}`;
        }
        break;
      default:
        // handling all other errors
        message = `Something went wrong: ${err.message}`;
        break;
    }
    return res.status(400).json({
      status: 'fail',
      message: message,
      data: null,
      errors: null,
    });
  }

  // Generic error handling (500)
  console.error(err);
  res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
    data: null,
    stack: environment.environment === 'development' ? err.stack : undefined,
  });
};
