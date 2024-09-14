import prisma from '../db/db';
import { AppError } from '../utils';
const toRestaurantDto = restaurant => {
  return {
    id: restaurant.id,
    name: restaurant.name,
    address: restaurant.address,
    phone: restaurant.phone,
    email: restaurant.email,
    description: restaurant.description,
    city: restaurant.city,
    state: restaurant.state,
    postalCode: restaurant.postalCode,
    latitude: restaurant.latitude,
    longitude: restaurant.longitude,
    ownerId: restaurant.ownerId,
    openingHours: restaurant.openingHours,
    capacity: restaurant.capacity,
  };
};
export const createRestaurant = async (req, res, next) => {
  const createdRestaurant = await prisma.restaurant.create({
    data: {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      description: req.body.description,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      ownerId: req.user.id,
      openingHours: req.body.openingHours,
      capacity: req.body.capacity,
    },
  });

  const restaurant = toRestaurantDto(createdRestaurant);

  res.status(200).json({
    status: 'success',
    message: 'Restaurant created successfully',
    data: {
      restaurant,
    },
  });
};

export const getRestaurantById = async (req, res, next) => {
  const restaurantId = req.params.id;
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id: restaurantId,
    },
  });

  if (!restaurant) {
    return next(new AppError('Restaurant not found', 404));
  }

  const restaurantDto = toRestaurantDto(restaurant);

  res.status(200).json({
    status: 'success',
    message: 'Restaurant found',
    data: {
      restaurant: restaurantDto,
    },
  });
};

export const deleteRestaurantById = async (req, res, next) => {
  const restaurantId = req.params.id;
  const restaurant = (await prisma.restaurant.findUnique({
    where: {
      id: restaurantId,
    },
  })) as { ownerId: string };
  if (!restaurant) {
    return next(new AppError('Restaurant not found', 404));
  }

  if (restaurant.ownerId !== req.user.id) {
    return next(
      new AppError('You are not authorized to delete this restaurant', 401)
    );
  }

  await prisma.restaurant.delete({
    where: {
      id: restaurantId,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Restaurant deleted successfully',
    data: null,
  });
};
