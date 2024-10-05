import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelDirective } from '../../directives/floatLabel.directive';

@Component({
  selector: 'rb-input-wrapper',
  standalone: true,
  imports: [CommonModule, FloatLabelDirective, FloatLabelDirective],
  templateUrl: './input-wrapper.component.html',
  styleUrl: './input-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputWrapperComponent {}
