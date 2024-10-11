import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AllControlsAreTouchedPipe,
  CardComponent,
  InputWrapperComponent,
  LinkButtonComponent,
  PrimaryButtonComponent,
} from '@restaurant-booking/shared-ui';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthFacadeService } from '../../services/auth-facade.service';
import { LoginReqModel } from '../../models/loginReq.model';
import { catchError, EMPTY, tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'rb-login',
  standalone: true,
  imports: [
    CommonModule,
    InputWrapperComponent,
    CardComponent,
    PrimaryButtonComponent,
    LinkButtonComponent,
    AllControlsAreTouchedPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private authFacadeService = inject(AuthFacadeService);
  public waitingForLogin = signal(false);

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }


    const formValue = this.loginForm.value;
    if (!formValue.email || !formValue.password) {
      return;
    }

    if (this.waitingForLogin()) {
      return;
    }

    this.waitingForLogin.set(true);

    const data: LoginReqModel = {
      email: formValue.email,
      password: formValue.password,
    };

    // Call the login method from the facade service
    this.authFacadeService.login(data).pipe(
      tap(res => {
        this.waitingForLogin.set(false);
      }),
      catchError(() => {
        this.waitingForLogin.set(false);
        return EMPTY;
      }),
      untilDestroyed(this),
    ).subscribe();

  }

}
