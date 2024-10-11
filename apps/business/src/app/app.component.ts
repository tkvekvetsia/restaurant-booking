import {
  AfterViewInit,
  Component,
  DoCheck,
  inject,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  authActions,
  AuthStatusHelperService,
  selectIsLoggedIn,
} from '@restaurant-booking/auth';
import { take } from 'rxjs';
import { SideNavComponent } from './core/components/side-nav/side-nav.component';
import { NgClass } from '@angular/common';
import { AuthFacadeService } from '../../../../libs/auth/src/lib/services/auth-facade.service';

@Component({
  standalone: true,
  imports: [RouterModule, SideNavComponent, NgClass],
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
