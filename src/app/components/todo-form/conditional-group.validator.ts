import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

/**
 * FormGroup coupled to the TodoForm.
 * This could be made more generic to allow for any types with
 * an enum to check for types being passed here to make conditional types,
 * but this task only has one form from what I can tell :eyes:
 */
export function checkGroupVisibilityConditionalValidator(groupVisibility: boolean): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.parent) {
      return null;
    }

    if (groupVisibility) {
      return Validators.required(control);
    }
    return null;
  }

}