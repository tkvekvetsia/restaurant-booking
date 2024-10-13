import {
  CreateMenuReqModel,
  MenuResModel,
  Menu,
} from '@restaurant-booking/shared-types';
import prisma from '../db/db';
import { Restaurant } from '@prisma/client';

export const createMenu = async (req, res, next) => {
  const restaurant = (await prisma.restaurant.findUnique({
    where: { id: req.body.restaurantId },
  })) as Restaurant;

  if (!restaurant) {
    return res.status(404).json({
      status: 'error',
      message: 'Restaurant not found',
    });
  }

  if (restaurant.ownerId !== req.user.id) {
    return res.status(401).json({
      status: 'error',
      message: 'You are not authorized to create a menu for this restaurant',
    });
  }

  const menu: CreateMenuReqModel = {
    restaurantId: req.body.restaurantId,
    name: req.body.name,
    description: req.body.description,
    restaurantName: restaurant.name,
    restaurantAvatar: restaurant.avatar,
  };

  const createdMenu = (await prisma.menu.create({
    data: {
      name: menu.name,
      description: menu.description || null,
      restaurantId: menu.restaurantId,
      restaurantName: menu.restaurantName,
      restaurantAvatar: menu.restaurantAvatar,
    },
  })) as Menu;

  const menuDto = toMenuDto(createdMenu);

  res.status(201).json({
    status: 'success',
    message: 'Menu created successfully',
    data: {
      menu: menuDto,
    },
  });
};

export const getMenusByRestaurantId = async (req, res, next) => {
  const restaurantId = req.params.id;
  const menus = (await prisma.menu.findMany({
    where: {
      restaurantId,
    },
  })) as Menu[];

  if (!menus && menus.length === 0) {
    res.status(200).json({
      status: 'success',
      message: 'No menus found',
      data: {
        menus: [],
      },
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Menus found',
    data: {
      menus: menus.map(toMenuDto),
    },
  });
};

function toMenuDto(menu: Menu): MenuResModel {
  return {
    id: menu.id,
    name: menu.name,
    description: menu.description,
    restaurantId: menu.restaurantId,
    menuItems: menu.menuItems || [],
    restaurantName: menu.restaurantName,
    restaurantAvatar: menu.restaurantAvatar,
  };
}
