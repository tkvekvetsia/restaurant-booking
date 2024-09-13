import { Restaurant } from './restaurant.model';
import { Booking } from './booking.model';
import { Review } from './review.model';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'customer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  restaurants?: Restaurant[]; // Optional field for restaurants owned by the user
  bookings?: Booking[]; // Optional field for user's bookings
  reviews?: Review[]; // Optional field for user's reviews
  profilePic?: string; // Nullable field for profile picture
}
