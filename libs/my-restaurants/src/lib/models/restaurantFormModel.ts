import { FormControl, FormArray, FormGroup } from '@angular/forms';

export interface restaurantFormModel {
  name: FormControl<string>;
  address: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  description: FormControl<string>;
  city: FormControl<string>;
  state: FormControl<string>;
  postalCode: FormControl<string>;
  latitude: FormControl<number | null>;
  longitude: FormControl<number | null>;
  openingHours: FormArray<FormGroup<OpeningHoursFormModel>>;
  capacity: FormControl<number | null>;
  img: FormControl<File | null>;
}

export interface OpeningHoursFormModel {
  day: FormControl<Day>;
  open: FormControl<string>;
  close: FormControl<string>;
}

export interface OpeningHoursFormValue {
  day: Day;
  open: string;
  close: string;
}

export type Day =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';
