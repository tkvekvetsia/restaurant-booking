import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserProfileService } from './user-profile.service';
import { Observable } from 'rxjs';
import { CoreResponse } from '@restaurant-booking/shared-types';
import { GetUserProfileRes } from '../models/getUserProfileRes.model';

@Injectable({
  providedIn: 'root',
})
export class UserProfileFacadeService {
  private store = inject(Store);
  private userProfileService = inject(UserProfileService);

  public getUserProfile(): Observable<CoreResponse<GetUserProfileRes>> {
    return this.userProfileService.getUserProfile();
  }
}
