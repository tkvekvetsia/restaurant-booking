import { inject, Injectable } from '@angular/core';
import { RestaurantManagementService } from './restaurant-management.service';
import { Observable } from 'rxjs';
import { GetRestaurantsModel } from 'libs/restaurants/src/lib/models/getRestaurants.model';
import { CoreResponse } from '@restaurant-booking/shared-types';

@Injectable({
  providedIn: 'root',
})
export class RestaurantManagementFacadeService {
  private restaurantManagementService = inject(RestaurantManagementService);

  public getRestaurantsByUser(): Observable<GetRestaurantsModel> {
    return this.restaurantManagementService.getRestaurantsByUser();
  }

  public createRestaurant(data: FormData): Observable<CoreResponse<null>> {
    return this.restaurantManagementService.createRestaurant(data);
  }
}
