import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../../../libs/auth/src/lib/services/auth.service';

@Component({
  selector: 'rb-side-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent {
  private authService = inject(AuthService);
  public onLogout(): void {
    this.authService.logout();
  }
}
