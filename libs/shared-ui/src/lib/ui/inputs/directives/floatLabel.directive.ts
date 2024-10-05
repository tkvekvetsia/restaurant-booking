import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[rbFloatLabel]',
  standalone: true,
})
export class FloatLabelDirective implements AfterViewInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private input: HTMLInputElement | null = null;
  private label: HTMLLabelElement | null = null;

  ngAfterViewInit() {
    const element = this.el.nativeElement;

    // Find the input and label elements inside the container
    this.input = element.querySelector('input');
    this.label = element.querySelector('label');

    // Initialize label state (in case the input already has a value)
    if (this.input?.value) {
      this.setFloatingLabel(true, true);
    }
  }

  // Handle input focus
  @HostListener('focusin', ['$event.target'])
  onFocusIn() {
    this.setFloatingLabel(true, !!this.input?.value);
  }

  // Handle input blur (when the input loses focus)
  @HostListener('focusout', ['$event.target'])
  onFocusOut() {
    if (!this.input?.value) {
      this.setFloatingLabel(false, !!this.input?.value);
    }
  }

  // Handle input event to detect if value has been entered
  @HostListener('input', ['$event.target'])
  onInput() {
    if (this.input?.value) {
      this.setFloatingLabel(true, !!this.input?.value);
    } else {
      // this.setFloatingLabel(false);
    }
  }

  // Function to toggle floating label class
  private setFloatingLabel(floating: boolean, isInputDirty: boolean) {
    if (!this.label) {
      return;
    }
    if (floating && !isInputDirty) {
      this.renderer.addClass(this.label, 'rb-label-floating');
      return;
    }

    if (floating && isInputDirty) {
      this.renderer.addClass(this.label, 'rb-label-floating');
      this.renderer.addClass(this.label, 'rb-label-floating--on-dirty');
      return;
    }

    this.renderer.removeClass(this.label, 'rb-label-floating');
    this.renderer.removeClass(this.label, 'rb-label-floating--on-dirty');
  }
}
