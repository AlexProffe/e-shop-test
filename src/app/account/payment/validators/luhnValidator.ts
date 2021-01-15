import { ValidatorFn, AbstractControl } from '@angular/forms';
import { luhnCheck } from '../helpers/luhn.helper';

export function luhnValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const isValid = luhnCheck(control.value);
    return isValid ? null:  {'luhnCheck': isValid};
  };
}