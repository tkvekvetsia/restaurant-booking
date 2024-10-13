import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AUTHORIZED_ROUTE } from '@restaurant-booking/auth';
import { environment } from '@restaurant-booking/environment';
import { Observable } from 'rxjs';
import {
  CoreResponse,
  GetRestaurantsModel,
  Restaurant,
} from '@restaurant-booking/shared-types';

@Injectable({
  providedIn: 'root',
})
export class RestaurantManagementService {
  private http = inject(HttpClient);
  private _prefix = 'restaurants';

  public getRestaurantsByUser(): Observable<GetRestaurantsModel> {
    const context = new HttpContext().set(AUTHORIZED_ROUTE, true);
    return this.http.get<GetRestaurantsModel>(
      `${environment.apiUrl}/${this._prefix}/ownedByUser`,
      { context }
    );
  }

  public createRestaurant(data: FormData): Observable<CoreResponse<null>> {
    const context = new HttpContext().set(AUTHORIZED_ROUTE, true);
    return this.http.post<CoreResponse<null>>(
      `${environment.apiUrl}/${this._prefix}`,
      data,
      { context }
    );
  }

  public getRestaurantDetailsById(id: string): Observable<CoreResponse<{restaurant:Restaurant}>> {
      return this.http.get<CoreResponse<{restaurant:Restaurant}>>(`${environment.apiUrl}/${this._prefix}/${id}`);
  }
}
