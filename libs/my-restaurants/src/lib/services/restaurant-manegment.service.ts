import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AUTHORIZED_ROUTE } from '@restaurant-booking/auth';
import { environment } from '@restaurant-booking/environment';
import { CoreResponse, Restaurant } from '@restaurant-booking/shared-types';
import { GetRestaurantsModel } from 'libs/restaurants/src/lib/models/getRestaurants.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantManegmentService {
  private http = inject(HttpClient);
  private _prefix = 'restaurants';

  public getRestaurantsByUser():Observable<GetRestaurantsModel>{
    const context = new HttpContext().set(AUTHORIZED_ROUTE, true);
    return this.http.get<GetRestaurantsModel>(`${environment.apiUrl}/${this._prefix}/ownedByUser`, {context});
  }
}
