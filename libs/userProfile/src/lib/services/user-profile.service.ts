import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoreResponse } from '@restaurant-booking/shared-types';
import { environment } from '@restaurant-booking/environment';
import { AUTHORIZED_ROUTE } from '@restaurant-booking/auth';
import { GetUserProfileRes } from '../models/getUserProfileRes.model';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private http = inject(HttpClient);
  private readonly _prefix = '/user';

  public getUserProfile(): Observable<CoreResponse<GetUserProfileRes>> {
    const context = new HttpContext().set(AUTHORIZED_ROUTE, true);
    return this.http.get<CoreResponse<GetUserProfileRes>>(
      `${environment.apiUrl}/${this._prefix}`, { context }
    );
  }
}
