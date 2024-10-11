import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
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
import { Day, OpeningHoursFormModel } from '../../models/restaurantFormModel';
import { InputWrapperComponent } from '@restaurant-booking/shared-ui';

@Component({
  selector: 'rb-opening-hours-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputWrapperComponent],
  templateUrl: './opening-hours-form.component.html',
  styleUrl: './opening-hours-form.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpeningHoursFormComponent implements OnInit {
  private controlContainer = inject(ControlContainer);
  public openingHoursForm = new FormGroup<{
    openingHours: FormArray<FormGroup<OpeningHoursFormModel>>;
  }>({
    openingHours: new FormArray<FormGroup<OpeningHoursFormModel>>([]),
  });

  private weekday: Day[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  ngOnInit() {
    this.openingHoursFormArr().controls = this.generateOpeningHoursFormArr();
    this.parentForm.setControl(
      'openingHours',
      this.openingHoursForm.get('openingHours')
    );
  }

  public openingHoursFormArr(): FormArray<FormGroup<OpeningHoursFormModel>> {
    return this.openingHoursForm.get('openingHours') as FormArray<
      FormGroup<OpeningHoursFormModel>
    >;
  }

  private generateOpeningHoursFormArr(): FormGroup<OpeningHoursFormModel>[] {
    return this.weekday.map(day => this.getOpeningHoursFormByDay(day));
  }

  private getOpeningHoursFormByDay(day: Day): FormGroup<OpeningHoursFormModel> {
    return new FormGroup({
      day: new FormControl<Day>(day, { nonNullable: true }),
      open: new FormControl('', {
        nonNullable: true,
      }),
      close: new FormControl('', {
        nonNullable: true,
      }),
    });
  }

  private get parentForm(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }
}
