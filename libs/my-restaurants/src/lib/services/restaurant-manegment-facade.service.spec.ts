import { TestBed } from '@angular/core/testing';

import { RestaurantManegmentFacadeService } from './restaurant-manegment-facade.service';

describe('RestaurantManegmentFacadeService', () => {
  let service: RestaurantManegmentFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantManegmentFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
