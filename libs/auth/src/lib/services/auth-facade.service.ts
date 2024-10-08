import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { RegisterReqModel } from '../models/registerReq.model';
import { Observable, tap } from 'rxjs';
import { CoreResponse } from '@restaurant-booking/shared-types';
import { LoginReqModel } from '../models/loginReq.model';
import { LoginResModel } from '../models/loginRes.model';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {
  private authService = inject(AuthService);
  private store = inject(Store);

  public register(data: RegisterReqModel): Observable<CoreResponse<null>> {
    return this.authService.register(data);
  }

  public login(data: LoginReqModel): Observable<CoreResponse<LoginResModel>> {
    return this.authService.login(data).pipe(
      tap(res=> {
        if (res.status === 'success' && res.data?.token) {
          localStorage.setItem('accessToken', res.data.token);
          location.assign('/');
        }
      })
    )
  }

}