import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseButtonComponent } from '../base-button/baseButton.component';

@Component({
  selector: 'rb-primary-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './primaryButton.component.html',
  styleUrl: './primaryButton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryButtonComponent extends BaseButtonComponent {
  @Input() role: ButtonRole = 'primary';
}

type ButtonRole = 'primary' | 'secondary' | 'warning' | 'error';
