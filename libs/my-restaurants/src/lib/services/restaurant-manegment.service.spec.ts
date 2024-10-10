import { TestBed } from '@angular/core/testing';

import { RestaurantManegmentService } from './restaurant-manegment.service';

describe('RestaurantManegmentService', () => {
  let service: RestaurantManegmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantManegmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
