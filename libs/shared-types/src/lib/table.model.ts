import { Restaurant } from './restaurant.model';

export interface Table {
  id: number;
  restaurantId: number;
  capacity: number;
  tableNumber: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  restaurant: Restaurant;
}
