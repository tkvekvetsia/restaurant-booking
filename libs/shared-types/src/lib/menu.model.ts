import { Restaurant } from './restaurant.model';

export interface Menu {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantAvatar: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  restaurant: Restaurant;
}
