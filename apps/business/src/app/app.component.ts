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

@Component({
  standalone: true,
  imports: [RouterModule, SideNavComponent, NgClass, ToastModule],
  selector: 'rb-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private authStatusHelperService = inject(AuthStatusHelperService);
  store = inject(Store);
  public isLoggedIn = toSignal(this.store.select(selectIsLoggedIn));

  ngOnInit() {
    this.store.dispatch(
      authActions.setIsLoggedIn({
        isLoggedIn: this.authStatusHelperService.isUserLoggedIn(),
      })
    );
  }
}
