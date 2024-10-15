import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rb-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  activeMonth: number = this.currentDate.getMonth();
  activeYear: number = this.currentDate.getFullYear();

  selectedMonth: number = this.activeMonth;
  selectedYear: number = this.activeYear;
  @Input() borderClass = 'border-t-0';

  @Input() set selectedDate(date: Date | null) {
    if (date) {
      this.selectedMonth = date.getMonth();
      this.selectedYear = date.getFullYear();
      this.activeMonth = date.getMonth();
      this.activeYear = date.getFullYear();
    }
    this._selectedDate = date;
  }

  get selectedDate(): Date | null {
    return this._selectedDate;
  }

  _selectedDate: Date | null = null;

  monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  calendarDays: CalendarDay[] = [];

  ngOnInit(): void {
    this.calculateCalendarDays();
  }

  // Calculate the dates for the calendar grid, including previous and next months' days
  calculateCalendarDays(): void {
    const firstDayOfMonth = new Date(this.activeYear, this.activeMonth, 1);
    const lastDayOfMonth = new Date(this.activeYear, this.activeMonth + 1, 0);

    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    // Get the previous month days to fill empty spots at the start
    const previousMonth = new Date(this.activeYear, this.activeMonth - 1, 1);
    const daysInPreviousMonth = new Date(
      this.activeYear,
      this.activeMonth,
      0
    ).getDate();

    // Calculate the starting and ending dates for the grid
    const totalCalendarDays = 35; // 6 rows * 7 days = 42 days
    this.calendarDays = [];

    // Add the previous month's last days to fill the start of the grid
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      this.calendarDays.push({
        date: new Date(
          this.activeYear,
          this.activeMonth - 1,
          daysInPreviousMonth - i
        ),
        isOtherMonth: true,
      });
    }

    // Add the current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      this.calendarDays.push({
        date: new Date(this.activeYear, this.activeMonth, day),
        isOtherMonth: false,
      });
    }

    // Add the next month's days to fill the remaining spots
    const remainingDays = totalCalendarDays - this.calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      this.calendarDays.push({
        date: new Date(this.activeYear, this.activeMonth + 1, i),
        isOtherMonth: true,
      });
    }
  }

  // Move to the previous month
  previousMonth(): void {
    if (this.activeMonth === 0) {
      this.activeMonth = 11;
      this.activeYear--;
    } else {
      this.activeMonth--;
    }
    this.calculateCalendarDays();
  }

  // Move to the next month
  nextMonth(): void {
    if (this.activeMonth === 11) {
      this.activeMonth = 0;
      this.activeYear++;
    } else {
      this.activeMonth++;
    }
    this.calculateCalendarDays();
  }

  // Check if a given date is today
  isToday(date: CalendarDay): boolean {
    const today = new Date();
    return (
      date.date.getDate() === today.getDate() &&
      date.date.getMonth() === today.getMonth() &&
      date.date.getFullYear() === today.getFullYear()
    );
  }

  isSelectedDate(date: CalendarDay): boolean {
    return (
      !!this.selectedDate &&
      date.date.getDate() === this.selectedDate.getDate() &&
      date.date.getMonth() === this.selectedDate.getMonth() &&
      date.date.getFullYear() === this.selectedDate.getFullYear()
    );
  }

  // Handle clicking on a day
  @Output() dateSelected = new EventEmitter<Date>();

  onDayClick(day: Date, isOtherMonth: boolean): void {
    if (isOtherMonth) {
      return;
    }
    // Here you can handle date selection
    this.selectedDate = day;
    this.dateSelected.emit(day);
  }
}

interface CalendarDay {
  date: Date;
  isOtherMonth: boolean;
}
