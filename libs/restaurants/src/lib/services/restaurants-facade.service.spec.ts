import { TestBed } from '@angular/core/testing';

import { RestaurantsFacadeService } from './restaurants-facade.service';

describe('RestaurantsFacadeService', () => {
  let service: RestaurantsFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
