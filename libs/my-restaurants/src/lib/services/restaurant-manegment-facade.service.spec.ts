import { TestBed } from '@angular/core/testing';

import { RestaurantManagementFacadeService } from './restaurant-management-facade.service';

describe('RestaurantManegmentFacadeService', () => {
  let service: RestaurantManagementFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantManagementFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
