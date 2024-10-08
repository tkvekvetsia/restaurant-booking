import { CanActivateFn , Router} from '@angular/router';
import { inject } from '@angular/core';
import { AuthStatusHelperService } from '../services/auth-status-helper.service';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectIsLoggedIn } from '../state/auth/auth.selectors';
import { of, switchMap } from 'rxjs';
import { authActions } from '../state/auth/auth.actions';

export const authGuard: CanActivateFn = () => {
  const authStatusHelperService = inject(AuthStatusHelperService);
  const store = inject(Store);
  // const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedInFromStore = toSignal(
    store
      .select(selectIsLoggedIn)
  );

  return of(authStatusHelperService.isUserLoggedIn()).pipe(
    switchMap(isLoggedIn => {
      if (isLoggedIn) {
        if (!isLoggedInFromStore()) {
          store.dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        }
        return of(true);
      }
      location.assign('/');
      return of(false);
    })
  );
};
