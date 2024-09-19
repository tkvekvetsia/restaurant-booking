import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'rb-base-button',
  standalone: true,
  templateUrl: './baseButton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseButtonComponent {
  @Input() label = '';
  @Input() disabled = false;
  @Input() type = 'button';
  @Input() styleClass = '';
  @Input() waiting = false;
  @Output() clickEvent = new EventEmitter<void>();
}
