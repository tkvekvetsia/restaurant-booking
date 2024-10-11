import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  ControlContainer,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  restaurantFormModel,
  Day,
  OpeningHoursFormModel,
} from '../../models/restaurantFormModel';
import {
  CardComponent,
  InputWrapperComponent,
} from '@restaurant-booking/shared-ui';
import { RestaurantFormComponent } from '../restaurant-form/restaurant-form.component';

@Component({
  selector: 'rb-add-restaurant',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ReactiveFormsModule,
    InputWrapperComponent,
    RestaurantFormComponent,
  ],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRestaurantComponent implements AfterViewInit {
  public addRestaurantForm = new FormGroup({});
  public readonly RESTAURANT_FORM_CONTROL_KEY = 'restaurant';

  private get restaurantForm(): AbstractControl<restaurantFormModel> {
    return this.addRestaurantForm.get(
      this.RESTAURANT_FORM_CONTROL_KEY
    ) as AbstractControl<restaurantFormModel>;
  }

  ngAfterViewInit() {
    console.log(this.restaurantForm);
  }
}
