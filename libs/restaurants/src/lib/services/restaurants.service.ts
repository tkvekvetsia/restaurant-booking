import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CoreResponse } from '@restaurant-booking/shared-types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private http = inject(HttpClient);

  public getAllRestaurants(): Observable<any> {
    return of(null).pipe(map(() => Error('Not implemented')));
  }
}
