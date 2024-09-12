import { Restaurant } from './restaurant.model';
import { User } from './user.model';

export interface Review {
  id: number;
  userId: number;
  restaurantId: number;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  user: User;
  restaurant: Restaurant;
}
