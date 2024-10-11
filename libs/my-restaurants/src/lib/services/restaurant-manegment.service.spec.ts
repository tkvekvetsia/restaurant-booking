import { TestBed } from '@angular/core/testing';

import { RestaurantManagementService } from './restaurant-management.service';

describe('RestaurantManegmentService', () => {
  let service: RestaurantManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
