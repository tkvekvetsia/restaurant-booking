import { NextFunction } from 'express';

export const registerUser = async (req, res, next) => {
  res.status(201).json({
    status: 'success',
    message: 'User registered successfully',
    data: req.body,
  });
};
