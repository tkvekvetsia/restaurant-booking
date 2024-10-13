import { Menu } from '../menu.model';

export interface CreateMenuReqModel {
  restaurantId: string;
  name: string;
  description?: string;
  restaurantName: string;
  restaurantAvatar: string;
}
//
// export interface MenuResModel {
//   id: string;
//   restaurantId: string;
//   name: string;
//   description?: string;
//   menuItems?: MenuItem[];
//   restaurantName: string;
// }

export type MenuResModel = Omit<
  Menu,
  'updatedAt' | 'createdAt' | 'deletedAt' | 'restaurant'
>;
