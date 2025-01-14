import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterReqModel } from '../models/registerReq.model';
import { Observable } from 'rxjs';
import { CoreResponse } from '@restaurant-booking/shared-types';
import { environment } from '@restaurant-booking/environment';
import { LoginReqModel } from '../models/loginReq.model';
import { LoginResModel } from '../models/loginRes.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private _prefix = 'auth';

  public register(data: RegisterReqModel): Observable<CoreResponse<null>> {
    return this.http.post<CoreResponse<null>>(
      `${environment.apiAuthUrl}/${this._prefix}/register`,
      data
    );
  }

  public login(data: LoginReqModel): Observable<CoreResponse<LoginResModel>> {
    return this.http.post<CoreResponse<LoginResModel>>(
      `${environment.apiAuthUrl}/${this._prefix}/login`,
      data
    );
  }

  public logout(navigationUrl?: string): void {
    localStorage.removeItem('AccessToken');
    location.assign(navigationUrl || '/');
  }
}
