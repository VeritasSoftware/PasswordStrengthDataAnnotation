# angular-my-password-strength

[![Angular Build & Test](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/angular.node.js.yml/badge.svg)](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/angular.node.js.yml)

|**Packages**|Version|Downloads|
|---------------------------|:---:|:---:|
|*angular-my-password-strength*|[![NPM Version](https://img.shields.io/npm/v/angular-my-password-strength)](https://www.npmjs.com/package/angular-my-password-strength)|[![Downloads count](https://img.shields.io/npm/dy/angular-my-password-strength)](https://www.npmjs.com/package/angular-my-password-strength)|

Define your password strength complexity requirements with ease using the library. 

The package provides a `passwordStrengthValidator` function that you can use to validate passwords in your reactive forms.

You can configure:

* Minimum length
* Minimum upper case characters
* Minimum lower case characters
* Minimum digits
* Minimum special characters
* Maximum same consecutive characters - eg aaa
* Maximum consecutive ascending/descending digits - eg 123 / 654
* Maximum consecutive ascending/descending characters - eg aBCd / DcbA

## Reactive Form Validation

You can validate passwords programmatically using the `passwordStrengthValidator` function provided in the package.

You can set the password strength requirements through the properties of the `MyPasswordStrengthOptions` class and pass the options to the function.

The special characters considered in the validation are: @$!%*?&. 

You can modify this set of special characters by setting the `specialCharacters` property of the options to a custom string of special characters.

### Sample Usage

First, import the validator in your component.

```typescript
import { MaximumNoOfConsecutiveCharacters, MaximumNoOfConsecutiveDigits, MyPasswordStrengthOptions, passwordStrengthValidator } from 'angular-my-password-strength';
```

Then, use it as shown below.

```typescript
// Configure password strength requirements
getOptions(): MyPasswordStrengthOptions {
    let options = new MyPasswordStrengthOptions();

    options.minimumLength = 9;
    options.requireUppercase = true;
    options.minimumUppercase = 2;
    options.requireLowercase = true;
    options.minimumLowercase = 3;
    options.requireDigit = true;
    options.minimumDigit = 2;
    options.requireSpecialCharacter = true;
    options.minimumSpecialCharacter = 2;
    options.requireMaxNoOfSameConsecutiveCharacters = true;
    options.maximumNoOfSameConsecutiveCharacters = 2;
    options.requireMaximumNoOfConsecutiveAscendingDigits = true;
    options.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Three;
    options.requireMaximumNoOfConsecutiveDescendingDigits = true;
    options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Two;
    options.requireMaximumNoOfConsecutiveAscendingCharacters = true;
    options.maximumNoOfConsecutiveAscendingCharacters = MaximumNoOfConsecutiveCharacters.Three;
    options.requireMaximumNoOfConsecutiveDescendingCharacters = true;
    options.maximumNoOfConsecutiveDescendingCharacters = MaximumNoOfConsecutiveCharacters.Two;

    return options;
}

constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
        password: ['', [
        Validators.required,
        // Password must be at least 9 chars, 2 uppercase, 3 lowercase, 2 digit, 2 special char, no more than 2 same consecutive chars, no more than 3 consecutive ascending digits, no more than 2 consecutive descending digits, no more than 3 consecutive ascending chars, no more than 2 consecutive descending chars
        passwordStrengthValidator(this.getOptions(), "InvalidPassword")
        ]]
    });
}
```

Your component markup can be like below.

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
    <label>Password:</label>
    <input type="password" formControlName="password">
    <br>
    <div *ngIf="password?.touched && password?.errors?.['InvalidPassword']" style="color: red;">
        Password must be at least 9 chars, 2 uppercase, 3 lowercase, 2 digit, 2 special char, no more than 2 same consecutive chars, no more than 3 consecutive ascending digits, no more than 2 consecutive descending digits, no more than 3 consecutive ascending chars, no more than 2 consecutive descending chars
    </div>

    <button type="submit" [disabled]="form.invalid">Submit</button>
</form>
```

![Password Strength](PasswordStrength.jpeg)