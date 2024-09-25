import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CoreResponse, Restaurant } from '@restaurant-booking/shared-types';
import { HttpClient } from '@angular/common/http';
import { environment } from '@restaurant-booking/environment';
import { GetRestaurantsModel } from '../models/getRestaurants.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private http = inject(HttpClient);
  private _prefix = 'restaurants';

  public getAllRestaurants(): Observable<GetRestaurantsModel> {
    return this.http.get<GetRestaurantsModel>(
      `${environment.apiUrl}/${this._prefix}`
    );
  }
}
