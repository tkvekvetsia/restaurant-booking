import { Menu } from './menu.model';

export interface MenuItem {
  id: number;
  menuId: number;
  name: string;
  description?: string;
  price: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  menu: Menu;
  image?: string; // Nullable field for image
}
