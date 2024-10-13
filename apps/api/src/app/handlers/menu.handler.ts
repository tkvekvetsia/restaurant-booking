import {
  CreateMenuReqModel,
  MenuResModel,
} from '@restaurant-booking/shared-types';
import prisma from '../db/db';
import { Menu, Restaurant } from '@prisma/client';

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
      ownerId: req.user.id,
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
    include: {
      menuItems: true,
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

export const getMenuById = async (req, res, next) => {
  const menuId = req.params.id;
  const menu = (await prisma.menu.findUnique({
    where: {
      id: menuId,
    },
  })) as Menu;

  if (!menu) {
    res.status(404).json({
      status: 'error',
      message: 'Menu not found',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Menu found',
    data: {
      menu: toMenuDto(menu),
    },
  });
};

export const deleteMenu = async (req, res, next) => {
  const menuId = req.params.id;
  const menu = (await prisma.menu.findUnique({
    where: {
      id: menuId,
    },
  })) as Menu;

  if (!menu) {
    res.status(404).json({
      status: 'error',
      message: 'Menu not found',
    });
  }

  if (menu.ownerId !== req.user.id) {
    res.status(401).json({
      status: 'error',
      message: 'You are not authorized to delete this menu',
    });
  }

  await prisma.menu.delete({
    where: {
      id: menuId,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Menu deleted successfully',
  });
};

export const updateMenu = async (req, res, next) => {
  const menuId = req.params.id;
  const menu = (await prisma.menu.findUnique({
    where: {
      id: menuId,
    },
  })) as Menu;

  if (!menu) {
    res.status(404).json({
      status: 'error',
      message: 'Menu not found',
    });
  }

  if (menu.ownerId !== req.user.id) {
    res.status(401).json({
      status: 'error',
      message: 'You are not authorized to update this menu',
    });
  }

  const updatedMenu = (await prisma.menu.update({
    where: {
      id: menuId,
    },
    data: {
      name: req.body.name,
      description: req.body.description,
    },
  })) as Menu;

  res.status(200).json({
    status: 'success',
    message: 'Menu updated successfully',
    data: {
      menu: toMenuDto(updatedMenu),
    },
  });
};

function toMenuDto(menu: Menu): MenuResModel {
  return {
    id: menu.id,
    name: menu.name,
    description: menu.description,
    restaurantId: menu.restaurantId,
    restaurantName: menu.restaurantName,
    restaurantAvatar: menu.restaurantAvatar,
  };
}
