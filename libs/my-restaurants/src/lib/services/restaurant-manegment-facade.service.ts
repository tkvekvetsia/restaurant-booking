import { inject, Injectable } from '@angular/core';
import { RestaurantManegmentService } from './restaurant-manegment.service';
import { Observable } from 'rxjs';
import { CoreResponse, Restaurant } from '@restaurant-booking/shared-types';
import { GetRestaurantsModel } from 'libs/restaurants/src/lib/models/getRestaurants.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantManegmentFacadeService {
  private restaurnatManegmentService = inject(RestaurantManegmentService);

  public getRestaurantsByUser():Observable<GetRestaurantsModel> {
    return this.restaurnatManegmentService.getRestaurantsByUser();
  }
}
