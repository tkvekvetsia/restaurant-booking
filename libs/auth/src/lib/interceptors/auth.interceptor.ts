import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';

export const PROTECT_URL = new HttpContextToken<boolean>(() => false);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(PROTECT_URL)) {
    const token = localStorage.getItem('token');
    req = req.clone(
      { headers: req.headers.append('Authorization', 'Bearer ' + token) },
    );
  }
  return next(req);
};
