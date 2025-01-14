import { User } from './user.model';
import { Menu } from './menu.model';
import { Booking } from './booking.model';
import { Table } from './table.model';
import { Review } from './review.model';

export interface Restaurant {
  id: string;
  ownerId: string;
  avatar: string;
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
  openingHours: OpeningHours; // This would be JSON object
  capacity: number;
  owner: User;
  menus?: Menu[]; // Optional field for menus
  bookings?: Booking[]; // Optional field for bookings
  tables?: Table[]; // Optional field for tables
  reviews?: Review[]; // Optional field for reviews
  images: string[]; // Array of image URLs
}

export interface OpeningHours {
  monday: OpeningHoursByDay[];
  tuesday: OpeningHoursByDay[];
  wednesday: OpeningHoursByDay[];
  thursday: OpeningHoursByDay[];
  friday: OpeningHoursByDay[];
  saturday: OpeningHoursByDay[];
  sunday: OpeningHoursByDay[];
}

export interface OpeningHoursByDay {
  open: string;
  close: string;
}
