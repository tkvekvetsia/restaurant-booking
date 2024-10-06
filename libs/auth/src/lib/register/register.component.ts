import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardComponent,
  InputWrapperComponent,
  LinkButtonComponent,
  PrimaryButtonComponent,
} from '@restaurant-booking/shared-ui';

@Component({
  selector: 'rb-register',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    InputWrapperComponent,
    PrimaryButtonComponent,
    LinkButtonComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {}
