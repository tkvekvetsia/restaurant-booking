import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputWrapperComponent } from '@restaurant-booking/shared-ui';

@Component({
  selector: 'rb-login',
  standalone: true,
  imports: [CommonModule, InputWrapperComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
