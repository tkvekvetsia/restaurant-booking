import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  OpeningHoursFormModel,
  OpeningHoursFormValue,
  restaurantFormModel,
} from '../../models/restaurantFormModel';
import {
  CardComponent,
  InputWrapperComponent,
  SuccessComponent,
} from '@restaurant-booking/shared-ui';
import { RestaurantFormComponent } from '../restaurant-form/restaurant-form.component';
import { RestaurantManagementFacadeService } from '../../services/restaurant-management-facade.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { OpeningHours } from '@restaurant-booking/shared-types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'rb-add-restaurant',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ReactiveFormsModule,
    InputWrapperComponent,
    RestaurantFormComponent,
    SuccessComponent,
  ],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRestaurantComponent {
  private restaurantManagementFacadeService = inject(
    RestaurantManagementFacadeService
  );

  public addRestaurantForm = new FormGroup({});
  public readonly RESTAURANT_FORM_CONTROL_KEY = 'restaurant';

  public waitingForCreate = signal(false);
  public showSuccessMessage = signal(false);

  public onSubmitForm(): void {
    if (!this.restaurantForm.valid || this.waitingForCreate()) {
      return;
    }

    this.waitingForCreate.set(true);
    this.restaurantManagementFacadeService
      .createRestaurant(this.generateRestaurantRequest())
      .pipe(
        tap(res => {
          this.waitingForCreate.set(false);
          if (res.status === 'success') {
            this.addRestaurantForm.reset();
            this.showSuccessMessage.set(true);
          }
        }),
        catchError(() => {
          this.waitingForCreate.set(false);
          return EMPTY;
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  public generateRestaurantRequest(): FormData {
    const formData = new FormData();
    formData.append('img', `${this.restaurantForm.get('img')?.value}`);
    formData.append('name', `${this.restaurantForm.get('name')?.value}`);
    formData.append(
      'description',
      `${this.restaurantForm.get('description')?.value}`
    );
    formData.append('address', `${this.restaurantForm.get('address')?.value}`);
    formData.append('city', `${this.restaurantForm.get('city')?.value}`);
    formData.append('state', `${this.restaurantForm.get('state')?.value}`);
    formData.append(
      'postalCode',
      `${this.restaurantForm.get('postalCode')?.value}`
    );
    formData.append(
      'latitude',
      `${this.restaurantForm.get('latitude')?.value}`
    );
    formData.append(
      'longitude',
      `${this.restaurantForm.get('longitude')?.value}`
    );
    // formData.append('phone', '123-456-7890');
    formData.append('email', `${this.restaurantForm.get('email')?.value}`);
    formData.append(
      'capacity',
      `${this.restaurantForm.get('capacity')?.value}`
    );
    formData.append('phone', `${this.restaurantForm.get('phone')?.value}`);
    formData.append(
      'openingHours',
      JSON.stringify(
        this.generateOpeningHours(
          this.restaurantForm.get('openingHours')?.value as any
        )
      )
    );

    return formData;
  }

  private get restaurantForm(): AbstractControl<restaurantFormModel> {
    return this.addRestaurantForm.get(
      this.RESTAURANT_FORM_CONTROL_KEY
    ) as AbstractControl<restaurantFormModel>;
  }

  private generateOpeningHours(
    openingHoursValue: OpeningHoursFormValue[]
  ): OpeningHours {
    const openingHours: OpeningHours = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };

    openingHoursValue.forEach(openingHoursValue => {
      openingHours[openingHoursValue.day].push({
        open: openingHoursValue.open,
        close: openingHoursValue.close,
      });
    });

    return openingHours;
  }
}
