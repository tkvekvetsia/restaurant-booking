import { Restaurant } from './restaurant.model';
import { BookingStatus } from './bookingStatus.enum';
import { User } from './user.model';

export interface Booking {
  id: number;
  userId: number;
  restaurantId: number;
  bookingDate: Date;
  bookingTime: Date;
  numPeople: number;
  status: BookingStatus;
  totalPrice?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  user: User;
  restaurant: Restaurant;
}
