import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
export const AUTHORIZED_ROUTE = new HttpContextToken<boolean>(() => false);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(AUTHORIZED_ROUTE)) {
    const token = localStorage.getItem('AccessToken');
    req = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + token),
    });
  }
  return next(req);
};
