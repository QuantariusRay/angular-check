import { checkGroupVisibilityConditionalValidator } from './conditional-group.validator';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('Conditional Group Validator function', () => {

  it('should not attempt to validate if no parent for the control is present', () => {
    let control = new FormControl('');
    expect(checkGroupVisibilityConditionalValidator(false)(control)).toBeNull();
  });

  it('should not return a validator if group visibility isn\'t allowed', () => {
    let control = new FormControl('');
    new FormGroup({ control });

    expect(checkGroupVisibilityConditionalValidator(false)(control)).toBeNull();
  });

  it('should return a validator if control is in a group who\'s consumer has groupVisibility on', () => {
    let control = new FormControl('');
    new FormGroup({ control });

    expect(checkGroupVisibilityConditionalValidator(true)(control)).toEqual(Validators.required(control));
  });
})
