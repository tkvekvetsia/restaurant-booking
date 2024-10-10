import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../../../libs/auth/src/lib/services/auth.service';
import { Store } from '@ngrx/store';
import { selectUserProfile, selectUserProfileLoading, userProfileActions } from '@restaurant-booking/userProfile';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'rb-side-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit {
  private authService = inject(AuthService);
  private store = inject(Store)

  public userProfile = toSignal(this.store.select(selectUserProfile));
  public loadingUserProfile = toSignal(this.store.select(selectUserProfileLoading));


  ngOnInit(): void {
    this.store.dispatch(userProfileActions.getUserProfile());
  }


  public onLogout(): void {
    this.authService.logout();
  }
}
