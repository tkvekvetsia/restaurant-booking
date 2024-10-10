import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AddRestaurantFormModel,
  OpeningHoursFormModel,
} from '../../models/addRestaurantForm.model';

@Component({
  selector: 'rb-add-restaurant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRestaurantComponent {
  // public addRestaurantForm = new FormGroup<AddRestaurantFormModel>({
  //   name: new FormControl('', {
  //     nonNullable: true,
  //     validators: [Validators.required],
  //   }),
  //   description: new FormControl('', {
  //     nonNullable: true,
  //     validators: [Validators.required],
  //   }),
  //   address: new FormControl('', {
  //     nonNullable: true,
  //     validators: [Validators.required],
  //   }),
  //   phone: new FormControl('', {
  //     nonNullable: true,
  //     validators: [Validators.required],
  //   }),
  //   email: new FormControl('', {
  //     nonNullable: true,
  //     validators: [Validators.required],
  //   }),
  //   city: new FormControl('', {
  //     nonNullable: true,
  //     validators: [Validators.required],
  //   }),
  //   state: new FormControl('', {
  //     nonNullable: true,
  //     validators: [Validators.required],
  //   }),
  //   postalCode: new FormControl('', {
  //     nonNullable: true,
  //     validators: [Validators.required],
  //   }),
  //   latitude: new FormControl(null, [Validators.required]),
  //   longitude: new FormControl(null, [Validators.required]),
  //   openingHours: new FormArray<FormGroup<OpeningHoursFormModel>>([
  //     new FormGroup({
  //       day: new FormControl('monday'),
  //       open: new FormControl('', {
  //         nonNullable: true,
  //         validators: [Validators.required],
  //       }),
  //       close: new FormControl('', {
  //         nonNullable: true,
  //         validators: [Validators.required],
  //       }),
  //     }),
  //   ]),
  //   capacity: new FormControl<number | null>(null),
  // });
}
