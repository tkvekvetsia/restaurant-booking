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
  @Input({ required: true }) label = '';
  @Input() disabled = false;
  @Input() type: ButtonType = 'button';
  @Input() styleClass = '';
  @Input() waiting = false;
  @Output() clickEvent = new EventEmitter();
}

type ButtonType = 'submit' | 'reset' | 'button';
