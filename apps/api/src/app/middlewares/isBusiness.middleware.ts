import { TokenUser } from '../models/tokenUser.model';

export const isBusiness = (req, res, next) => {
  const user = req.user as TokenUser;
  if (!user || (user.role !== 'business' && user.role !== 'admin')) {
    return res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
    });
  }
  next();
};
