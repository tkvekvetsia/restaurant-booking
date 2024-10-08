import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectIsLoggedIn } from '@restaurant-booking/auth';
import { take } from 'rxjs';
import { SideNavComponent } from './core/components/side-nav/side-nav.component';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, SideNavComponent, NgClass],
  selector: 'rb-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  store = inject(Store);
  public isLoggedIn = toSignal(
    this.store.select(selectIsLoggedIn).pipe(take(1))
  );
}
