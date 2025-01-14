import jwt from 'jsonwebtoken';
import { environment } from '../config/environment';

export const authorizationMiddleware = (req, res, next) => {
  if (req.body.user) {
    return res
      .status(401)
      .json({ status: 'fail', message: 'invalid request body' });
  }
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
  }
  const token = bearer.split('Bearer ')[1].trim();
  if (!token) {
    return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
  }
  try {
    jwt.verify(token, environment.jwtSecret, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ status: 'fail', message: 'Unauthorized' });
      }
      req.user = decoded;
      next();
    });
  } catch (e) {
    console.error(e);
    return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
  }
};
