# angular-my-password-strength

[![Angular Build & Test](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/angular.node.js.yml/badge.svg)](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/angular.node.js.yml)

Define your password strength complexity requirements with ease using the library. 

The package provides a `passwordStrengthValidator` function that you can use to validate passwords in your reactive forms.

You can configure:

* Minimum length
* Minimum upper case characters
* Minimum lower case characters
* Minimum digits
* Minimum special characters
* Maximum same consecutive characters - eg aaa
* Maximum consecutive ascending and/or descending digits - eg 123 / 654
* Maximum consecutive ascending and/or descending characters - eg aBCd / DcbA
* Repeated sequence check - eg in P@ssword@s - @s is repeating sequence

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
    options.requireRepeatingSequenceCheck = true;
    options.minimumLengthOfRepeatingSequence = 2;

    return options;
}

constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
        password: ['', [
        Validators.required,
        // Wire up the validator
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
        Password must have
        <ul>
            <li>at least 9 chars</li>
            <li>at least 2 uppercase</li>
            <li>at least 3 lowercase</li>
            <li>at least 2 digit</li>
            <li>at least 2 special char</li>
            <li>no more than 2 same consecutive chars</li>
            <li>no more than 3 consecutive ascending digits</li>
            <li>no more than 2 consecutive descending digits</li>
            <li>no more than 3 consecutive ascending chars</li>
            <li>no more than 2 consecutive descending chars</li>
            <li>no repeating sequence 2 or more chars long</li>
        </ul>
    </div>

    <button type="submit" [disabled]="form.invalid">Submit</button>
</form>
```