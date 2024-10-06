import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseButtonComponent } from '../base-button/baseButton.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'rb-link-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './link-button.component.html',
  styleUrl: './link-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkButtonComponent extends BaseButtonComponent {
  @Input({ required: true }) url = '';
}
