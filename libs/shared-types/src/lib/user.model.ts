import { Restaurant } from './restaurant.model';
import { Booking } from './booking.model';
import { Review } from './review.model';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: 'customer' | 'admin' | 'business';
  deletedAt?: Date | null;
  restaurants?: Restaurant[]; // Optional field for restaurants owned by the user
  bookings?: Booking[]; // Optional field for user's bookings
  reviews?: Review[]; // Optional field for user's reviews
  profilePic?: string; // Nullable field for profile picture
}
