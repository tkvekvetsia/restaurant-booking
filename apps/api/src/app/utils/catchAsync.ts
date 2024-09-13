import { NextFunction } from 'express';

export const catchAsync = (fn: (req, res, next) => any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

// export const catchAsync = (fn :Function) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     fn(req, res, next).catch(next);
//   };
// }
