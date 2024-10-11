import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlContainer,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  restaurantFormModel,
  OpeningHoursFormModel,
} from '../../models/restaurantFormModel';
import {
  FileUploadComponent,
  InputWrapperComponent,
  PrimaryButtonComponent,
} from '@restaurant-booking/shared-ui';
import { OpeningHoursFormComponent } from '../opening-hours-form/opening-hours-form.component';

@Component({
  selector: 'rb-restaurant-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputWrapperComponent,
    PrimaryButtonComponent,
    OpeningHoursFormComponent,
    FileUploadComponent,
  ],
  templateUrl: './restaurant-form.component.html',
  styleUrl: './restaurant-form.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestaurantFormComponent implements OnInit {
  private controlContainer = inject(ControlContainer);

  @Input({ required: true }) controlKey = '';
  @Input() waitingForCreate = false;
  @Output() formSubmitted = new EventEmitter();

  public restaurantForm = new FormGroup<restaurantFormModel>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    address: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    city: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    state: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    postalCode: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    latitude: new FormControl(null, [Validators.required]),
    longitude: new FormControl(null, [Validators.required]),
    openingHours: new FormArray<FormGroup<OpeningHoursFormModel>>([]),
    capacity: new FormControl<number | null>(null),
    img: new FormControl<File | null>(null),
  });

  ngOnInit(): void {
    this.parentFormGroup.addControl(this.controlKey, this.restaurantForm);
  }
  private get parentFormGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  public steps = signal([1, 2]);
  public selectedStep = signal(1);

  public onNextClick(): void {
    if (this.selectedStep() !== this.steps().length) {
      this.selectedStep.set(this.selectedStep() + 1);
      return;
    }

    if (this.selectedStep() === 1) {
      this.restaurantForm.markAllAsTouched();
    }
    if (this.selectedStep() === this.steps().length) {
      this.formSubmitted.emit();
    }
  }

  public onPreviousClick(): void {
    if (this.selectedStep() !== 1) {
      this.selectedStep.set(this.selectedStep() - 1);
    }
  }

  fillForm() {
    // formData.append('name', 'Restaurant ' + nameCount);
    // formData.append('description', `Restaurant ${nameCount} description`);
    // formData.append('address', '123 Main St');
    // formData.append('city', 'San Francisco');
    // formData.append('state', 'CA');
    // formData.append('postalCode', '94105');
    // formData.append('latitude', 37.789668);
    // formData.append('longitude', -122.400558);
    // // formData.append('phone', '123-456-7890');
    // formData.append('email', 'test@gmail.com');
    // formData.append('capacity', 100);
    // formData.append('phone', '599999999');
    // formData.append('openingHours', JSON.stringify(openingHours));
    this.restaurantForm.patchValue({
      name: 'Restaurant Name',
      description: 'Description',
      address: 'Address',
      phone: '123-456-7890',
      email: 'tes-busines@gmail.com',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      latitude: 37.789668,
      longitude: -122.400558,
      capacity: 100,
      openingHours: [
        { day: 'monday', open: '09:00', close: '17:00' },
        { day: 'tuesday', open: '09:00', close: '17:00' },
        { day: 'wednesday', open: '09:00', close: '17:00' },
        { day: 'thursday', open: '09:00', close: '17:00' },
        { day: 'friday', open: '09:00', close: '17:00' },
        { day: 'saturday', open: '09:00', close: '17:00' },
        { day: 'sunday', open: '09:00', close: '17:00' },
      ],
    });
  }
}
