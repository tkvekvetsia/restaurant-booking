import { inject, Injectable } from '@angular/core';
import { RestaurantsService } from './restaurants.service';
import { Observable } from 'rxjs';
import { CoreResponse } from '@restaurant-booking/shared-types';
import { GetRestaurantsModel } from '../models/getRestaurants.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsFacadeService {
  private restaurantsService = inject(RestaurantsService);

  public getAllRestaurants(): Observable<GetRestaurantsModel> {
    return this.restaurantsService.getAllRestaurants();
  }
}
