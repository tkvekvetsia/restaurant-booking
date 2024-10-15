import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  authActions,
  AuthStatusHelperService,
  selectIsLoggedIn,
} from '@restaurant-booking/auth';
import { SideNavComponent } from './core/components/side-nav/side-nav.component';
import { NgClass } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import {
  CalendarComponent,
  CalendarInputComponent,
} from '@restaurant-booking/shared-ui';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    SideNavComponent,
    NgClass,
    ToastModule,
    CalendarComponent,
    CalendarInputComponent,
    ReactiveFormsModule,
  ],
  selector: 'rb-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private authStatusHelperService = inject(AuthStatusHelperService);
  store = inject(Store);
  public isLoggedIn = toSignal(this.store.select(selectIsLoggedIn));
  // date with 10 28 2024
  date = new Date(2024, 11, 28);
  control = new FormControl();

  ngOnInit() {
    this.store.dispatch(
      authActions.setIsLoggedIn({
        isLoggedIn: this.authStatusHelperService.isUserLoggedIn(),
      })
    );
    this.control.setValue(this.date);
  }
}
