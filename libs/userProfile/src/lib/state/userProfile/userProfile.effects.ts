import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { UserProfileFacadeService } from '../../services/user-profile-facade.service';
import { userProfileActions } from './userProfile.actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const getUserProfileEffect = createEffect(
  (
    actions$ = inject(Actions),
    userProfileFacade = inject(UserProfileFacadeService)
  ) => {
    return actions$.pipe(
      ofType(userProfileActions.getUserProfile),
      switchMap(() => {
        return userProfileFacade.getUserProfile().pipe(
          map(res => {
            if (res.status === 'success' && res.data) {
              return userProfileActions.getUserProfileSuccess({
                userProfile: res.data.user,
              });
            }
            return userProfileActions.getUserProfileFailure({
              error: res.message || '',
            });
          }),
          catchError(() =>
            of(
              userProfileActions.getUserProfileFailure({
                error: 'something went wrong',
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);
