import { Component, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../calendar/calendar.component';
import { InputWrapperComponent } from '../input-wrapper/input-wrapper.component';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ClickOutsideDirective } from '../../directives/clickOutside.directive';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'rb-calendar-input',
  standalone: true,
  imports: [
    CommonModule,
    CalendarComponent,
    InputWrapperComponent,
    ReactiveFormsModule,
    ClickOutsideDirective,
  ],
  templateUrl: './calendar-input.component.html',
  styleUrl: './calendar-input.component.scss',
  animations: [
    trigger('calendarAnimation', [
      // Closed state with max-height 0
      state(
        'closed',
        style({
          opacity: 0,
          maxHeight: '0px', // Set max-height to 0 when closed
          // overflow: 'hidden',
          display: 'none',
        })
      ),
      // Open state with max-height to allow expansion
      state(
        'open',
        style({
          opacity: 1,
          maxHeight: '400px', // Adjust this value to your desired max height
          display: 'block',
        })
      ),
      // Transition from closed to open
      transition('closed => open', [
        style({ display: 'block' }), // Ensure it's visible before animation starts
        animate('300ms ease-out'), // Animate max-height and opacity
      ]),
      // Transition from open to closed
      transition('open => closed', [
        animate(
          '100ms ease-in',
          style({
            opacity: 0,
            maxHeight: '0px',
          })
        ),
      ]),
    ]),
  ], // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarInputComponent),
      multi: true,
    },
  ],
})
export class CalendarInputComponent implements ControlValueAccessor {
  showCalendar = true;
  selectedDate: Date | null = null;
  dateControl = new FormControl();
  calendarPosition = 'top-full';
  calendarBorderClass = 'border-t-0';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onChange = (value: any) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onTouched = (value: any) => {};

  @ViewChild('dateInput') dateInput!: ElementRef;

  // Method to open the calendar
  openCalendar(event: FocusEvent): void {
    const inputElement = this.dateInput.nativeElement;
    const rect = inputElement.getBoundingClientRect(); // Get position of input
    const spaceBelow = window.innerHeight - rect.bottom; // Space available below input
    const spaceAbove = rect.top; // Space available above input
    // Decide calendar position based on available space
    if (spaceBelow > 400 && spaceAbove < 400) {
      // 300 can be adjusted to your calendar height
      this.calendarPosition = 'top-full';
      this.calendarBorderClass = 'border-t-0';
    } else {
      this.calendarPosition = 'bottom-full';
      this.calendarBorderClass = 'border-b-0';
    }
    this.showCalendar = true;
  }

  // Method to close the calendar
  closeCalendar(): void {
    this.showCalendar = false;
  }

  // Method to handle date selection from the calendar
  onDateSelect(date: Date): void {
    this.selectedDate = date;
    this.dateControl.setValue(this.formatDate(date));
    this.closeCalendar();
  }

  // Format the selected date for display in the input field
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // HostListener to detect clicks outside the calendar component
  onClickOutside(): void {
    this.closeCalendar();
  }
  get calendarState(): string {
    return this.showCalendar ? 'open' : 'closed';
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (!(value instanceof Date)) {
      return;
    }
    this.selectedDate = value;
    this.dateControl.setValue(this.formatDate(value));
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.dateControl.disable() : this.dateControl.enable();
  }
}
