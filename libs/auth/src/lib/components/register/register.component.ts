import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AllControlsAreTouchedPipe,
  CardComponent,
  InputWrapperComponent,
  LinkButtonComponent,
  PrimaryButtonComponent,
} from '@restaurant-booking/shared-ui';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'rb-register',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    InputWrapperComponent,
    PrimaryButtonComponent,
    LinkButtonComponent,
    ReactiveFormsModule,
    AllControlsAreTouchedPipe,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  public registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    passwordGroup: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }),
  });

  public onSubmit(): void {
    if (!this.registerForm.valid) {
      this.makeControlsTouched();
      return;
    }
  }

  public makeControlsTouched(): void {
    this.registerForm.markAllAsTouched();
  }

}
