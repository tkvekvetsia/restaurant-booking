import prisma from '../db/db';
import { AppError } from '../utils';
import { hasPermissionForAction, processAndSaveImage } from '../utils';
import { v4 as uuidv4 } from 'uuid';

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
    avatar: restaurant.avatar,
  };
};

export const getRestaurants = async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    city,
    address,
    dish,
    sortBy,
    desc = false,
  } = req.query;

  const skip = (page - 1) * limit;

  const restaurants = await prisma.restaurant.findMany({
    where: {
      city: { contains: city, mode: 'insensitive' },
      address: { contains: address, mode: 'insensitive' },
      menus: dish
        ? {
            some: {
              menuItems: {
                some: {
                  name: { contains: dish, mode: 'insensitive' },
                },
              },
            },
          }
        : undefined,
    },
    orderBy: sortBy,
    skip,
    take: limit,
  });

  const restaurantDtos = restaurants.map(res => toRestaurantDto(res));
  res.status(200).json({
    status: 'success',
    data: {
      restaurants: restaurantDtos,
    },
  });
};

export const createRestaurant = async (req, res, next) => {
  let fileName: string | null = null;
  if (req.file) {
    fileName = uuidv4() + '.restaurant.avatar';
    const result = await processAndSaveImage(req.file, fileName);
    if (result && result.format) {
      fileName = `${fileName}.${result.format}`;
    }
  }

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
      latitude: parseFloat(req.body.latitude),
      longitude: parseFloat(req.body.longitude),
      ownerId: req.user.id,
      openingHours: req.body.openingHours,
      capacity: parseInt(req.body.capacity),
      avatar: fileName,
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

  if (!hasPermissionForAction(req.body.user, restaurant.ownerId)) {
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
