import { Component, ContentChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatLabelDirective } from '../../directives/floatLabel.directive';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'rb-input-wrapper',
  standalone: true,
  imports: [CommonModule, FloatLabelDirective, FloatLabelDirective],
  templateUrl: './input-wrapper.component.html',
  styleUrl: './input-wrapper.component.scss',
})
export class InputWrapperComponent {
  @Input() styleClass = '';

  @ContentChild(NgControl) control!: NgControl | null;
}
