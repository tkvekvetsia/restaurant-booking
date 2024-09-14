import { User } from '@restaurant-booking/shared-types';

export const registerUser = async (req, res, next) => {
  const user: Pick<User, 'email' & 'name' & 'password' & 'phone'> = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  res.status(201).json({
    status: 'success',
    message: 'User registered successfully',
    data: req.body,
  });
};
