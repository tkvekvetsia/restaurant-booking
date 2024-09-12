import { Restaurant } from './restaurant.model';
import { MenuItem } from './menuItem.model';

export interface Menu {
  id: number;
  restaurantId: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  restaurant: Restaurant;
  menuItems?: MenuItem[]; // Optional field for menu items
}
