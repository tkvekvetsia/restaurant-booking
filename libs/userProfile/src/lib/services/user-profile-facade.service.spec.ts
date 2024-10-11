import { TestBed } from '@angular/core/testing';

import { UserProfileFacadeService } from './user-profile-facade.service';

describe('UserProfileFacadeService', () => {
  let service: UserProfileFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
