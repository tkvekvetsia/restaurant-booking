import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../../../libs/auth/src/lib/services/auth.service';
import { Store } from '@ngrx/store';
import {
  selectUserProfile,
  selectUserProfileLoading,
  userProfileActions,
} from '@restaurant-booking/userProfile';
import { toSignal } from '@angular/core/rxjs-interop';
import { url } from 'inspector';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'rb-side-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit {
  private authService = inject(AuthService);
  private store = inject(Store);

  public userProfile = toSignal(this.store.select(selectUserProfile));
  public loadingUserProfile = toSignal(
    this.store.select(selectUserProfileLoading)
  );

  public menuItems = signal<MenuItem[]>([
    {
      url: '/restaurants',
      label: 'My Restaurants',
    },
    {
      url: '/restaurants/add',
      label: 'Add Restaurant',
    },
  ]);

  ngOnInit(): void {
    this.store.dispatch(userProfileActions.getUserProfile());
  }

  public onLogout(): void {
    this.authService.logout();
  }
}

interface MenuItem {
  url: string;
  label: string;
}
