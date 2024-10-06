import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputWrapperComponent } from '../inputs/components/input-wrapper/input-wrapper.component';
import { PrimaryButtonComponent } from '../buttons/primary-button/primaryButton.component';

@Component({
  selector: 'rb-card',
  standalone: true,
  imports: [CommonModule, InputWrapperComponent, PrimaryButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {}
