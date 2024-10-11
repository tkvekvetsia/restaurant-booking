import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../card/card.component';
import { LinkButtonComponent } from '../../../buttons/link-button/link-button.component';

@Component({
  selector: 'rb-success',
  standalone: true,
  imports: [CommonModule, CardComponent, LinkButtonComponent],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessComponent {
  @Input() message = '';
  @Input() linkText = '';
  @Input() linkUrl = '';
}
