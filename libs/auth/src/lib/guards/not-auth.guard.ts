import { CanActivateFn , Router} from '@angular/router';
import { inject } from '@angular/core';
import { AuthStatusHelperService } from '../services/auth-status-helper.service';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const authStatusHelperService = inject(AuthStatusHelperService);
  const router = inject(Router);
  if (!authStatusHelperService.isUserLoggedIn()) {
    return true;
  }

  router.navigate(['/dashboard']);
  return true;
};
