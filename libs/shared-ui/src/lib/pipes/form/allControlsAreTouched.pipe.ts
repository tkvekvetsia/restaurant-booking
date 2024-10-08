import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'allControlsAreTouched',
  standalone: true,
  pure: false,
})
export class AllControlsAreTouchedPipe implements PipeTransform {
  transform(value: FormGroup): boolean {
    return this.areRequiredControlsTouched(value);
  }

  private areRequiredControlsTouched(form: FormGroup | FormArray): boolean {
    let allTouched = true;

    // Loop over all controls in the form group or form array
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);

      // If control is a FormGroup or FormArray, call the function recursively
      if (control instanceof FormGroup || control instanceof FormArray) {
        if (!this.areRequiredControlsTouched(control)) {
          allTouched = false;
        }
      }
      // If the control is a FormControl, check if it's required and touched
      else if (control instanceof FormControl) {
        if (control.invalid && !control.touched) {
          allTouched = false;
        }
      }
    });

    return allTouched;
  }
}
