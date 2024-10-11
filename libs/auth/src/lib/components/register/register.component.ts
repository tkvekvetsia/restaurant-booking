import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AllControlsAreTouchedPipe,
  CardComponent,
  InputWrapperComponent,
  LinkButtonComponent,
  PrimaryButtonComponent,
} from '@restaurant-booking/shared-ui';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthFacadeService } from '../../services/auth-facade.service';
import { RegisterReqModel } from '../../models/registerReq.model';
import { UntilDestroy } from '@ngneat/until-destroy';
import { catchError, EMPTY, tap } from 'rxjs';

@UntilDestroy()
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
  private authFacadeService = inject(AuthFacadeService);

  public registerForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    phone: new FormControl<string>(''),
    passwordGroup: new FormGroup({
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl<string>('', [Validators.required]),
    }),
  });

  public waitingForRegistration = signal(false);

  public onSubmit(): void {
    if (!this.registerForm.valid) {
      this.makeControlsTouched();
      return;
    }

    if (this.waitingForRegistration()) {
      return;
    }

    this.waitingForRegistration.set(true);

    const formValue = this.registerForm.value;
    const data: RegisterReqModel = {
      name: formValue.name || '',
      email: formValue.email || '',
      phone: formValue.phone || '',
      password: formValue.passwordGroup?.password || '',
      confirmPassword: formValue.passwordGroup?.confirmPassword || '',
    };

    this.authFacadeService
      .register(data)
      .pipe(
        tap(() => {
          this.waitingForRegistration.set(false);
        }),
        catchError(() => {
          this.waitingForRegistration.set(false);
          return EMPTY;
        })
      )
      .subscribe();
  }

  public makeControlsTouched(): void {
    this.registerForm.markAllAsTouched();
  }
}
