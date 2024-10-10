import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CardComponent,
  InputWrapperComponent,
  PrimaryButtonComponent,
} from '@restaurant-booking/shared-ui';
import { Store } from '@ngrx/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { selectUserProfile } from '../state/userProfile/userProfile.selectors';
import { tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'rb-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent, InputWrapperComponent, PrimaryButtonComponent],
  templateUrl: './userProfile.component.html',
  styleUrl: './userProfile.component.scss',
})
export class UserProfileComponent implements OnInit{
  private store = inject(Store)

  public userInfoForm = new FormGroup({
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

  ngOnInit(): void {
    this.store.select(selectUserProfile).pipe(
      tap(user => {
        this.userInfoForm.patchValue({
          name:user?.name || null,
          email: user?.email || null, 
          phone: user?.phone || null,
        })
      })
    ).subscribe()
  }

}
