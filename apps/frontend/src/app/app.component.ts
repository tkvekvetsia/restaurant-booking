import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimaryButtonComponent } from '@restaurant-booking/shared-ui';
import { HeaderComponent } from './core/header/header.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    PrimaryButtonComponent,
    HeaderComponent,
    ReactiveFormsModule,
  ],
  selector: 'rb-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  control = new FormControl('', [Validators.required]);
}
