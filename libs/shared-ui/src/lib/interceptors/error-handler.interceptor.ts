import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, tap, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  return next(req).pipe(
    tap(res => {
      // const response = res as CoreResponse<any>;
      // if (response.status === 'fail') {
      //   messageService.add({
      //     severity: 'error',
      //     summary: 'Error',
      //     detail: response.message || '',
      //     life: 5000,
      //   });
      // }
    }),
    catchError(err => {
      const error = err.error;
      if (!error) {
        return throwError(() => err);
      }

      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((error: any) => {
          messageService.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: error.msg || '',
          });
        });
      } else if (error.message) {
        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || '',
        });
      }

      return throwError(() => err);
    })
  );
};
