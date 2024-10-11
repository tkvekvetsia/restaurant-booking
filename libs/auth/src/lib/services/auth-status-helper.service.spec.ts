import { TestBed } from '@angular/core/testing';

import { AuthStatusHelperService } from './auth-status-helper.service';

describe('AuthStatusHelperService', () => {
  let service: AuthStatusHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthStatusHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
