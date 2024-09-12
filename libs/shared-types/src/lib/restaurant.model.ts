import { User } from './user.model';
import { Menu } from './menu.model';
import { Booking } from './booking.model';
import { Table } from './table.model';
import { Review } from './review.model';

export interface Restaurant {
  id: number;
  ownerId: number;
  name: string;
  description?: string;
  address: string;
  city?: string;
  state?: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  openingHours: any; // This would be JSON object
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  owner: User;
  menus?: Menu[]; // Optional field for menus
  bookings?: Booking[]; // Optional field for bookings
  tables?: Table[]; // Optional field for tables
  reviews?: Review[]; // Optional field for reviews
}
