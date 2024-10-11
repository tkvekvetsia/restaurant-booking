import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
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
  public selectedStep = signal(2);

  public onNextClick(): void {
    if (this.selectedStep() !== this.steps().length) {
      this.selectedStep.set(this.selectedStep() + 1);
    }
  }

  public onPreviousClick(): void {
    if (this.selectedStep() !== 1) {
      this.selectedStep.set(this.selectedStep() - 1);
    }
  }
}
