import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PasswordStrengthValidator } from 'ts-my-password-strength';

export function passwordStrengthValidator(options: MyPasswordStrengthOptions = new MyPasswordStrengthOptions(),
                                          errorKey: string = "Invalid"): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    if (!control.value) return null; // don't validate empty values here

    let validator = new PasswordStrengthValidator();

    validator.minimumLength = options.minimumLength;
    validator.requireUppercase = options.requireUppercase;
    validator.minimumUppercase = options.minimumUppercase;
    validator.requireLowercase = options.requireLowercase;
    validator.minimumLowercase = options.minimumLowercase;
    validator.requireDigit = options.requireDigit;
    validator.minimumDigit = options.minimumDigit;
    validator.requireSpecialCharacter = options.requireSpecialCharacter;
    validator.minimumSpecialCharacter = options.minimumSpecialCharacter;
    validator.specialCharacters = options.specialCharacters;
    validator.requireMaxNoOfSameConsecutiveCharacters = options.requireMaxNoOfSameConsecutiveCharacters;
    validator.maximumNoOfSameConsecutiveCharacters = options.maximumNoOfSameConsecutiveCharacters;

    console.log("Validator configuration: ", validator);

    let isValid = validator.passwordStrength(control.value);
    console.log("Password strength validation result: ", isValid);

    return isValid ? null : { [errorKey]: true };
  };
}

export class MyPasswordStrengthOptions {
  minimumLength: number = 6;
  requireLowercase : boolean = true;
  minimumLowercase : number = 1;
  requireDigit : boolean = true;
  minimumDigit : number = 1;
  requireSpecialCharacter : boolean = true;
  minimumSpecialCharacter : number = 1;
  specialCharacters : string = '@$!%*?&';
  requireUppercase : boolean = true;
  minimumUppercase : number = 1;
  requireMaxNoOfSameConsecutiveCharacters  : boolean = true;
  maximumNoOfSameConsecutiveCharacters : number = 2;
}