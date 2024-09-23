import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimaryButtonComponent } from '@restaurant-booking/shared-ui';

@Component({
  standalone: true,
  imports: [RouterModule, PrimaryButtonComponent],
  selector: 'rb-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
