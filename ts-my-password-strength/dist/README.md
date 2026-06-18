# ts-my-password-strength

[![TypeScript Build & Test](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/node.js.yml/badge.svg)](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/node.js.yml)

Define your password strength complexity requirements with ease using the library. 

The package provides a `PasswordStrengthValidator` class that you can use to validate passwords programmatically.

## Programmatic Password Validation

You can validate passwords programmatically using the `PasswordStrengthValidator` class provided in the package.

You can set the password strength requirements through the properties of the `PasswordStrengthValidator` class, 

and then call the `PasswordStrength` method to check if a given password meets those requirements.

The `PasswordStrength` method returns a boolean indicating whether the password is valid according to the configured requirements.

The special characters considered in the validation are: !"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~. 

You can modify this set of special characters by setting the `specialCharacters` property to a custom string of special characters.

### Sample Usage

First import the validator.

```typescript
import { PasswordStrengthValidator } from 'ts-my-password-strength';
```

Then, use it as shown below.

```typescript
// Configure password strength requirements
let validator = new PasswordStrengthValidator();

validator.minimumLength = 8;
validator.requireUppercase = true;
validator.minimumUppercase = 2;
validator.requireLowercase = true;
validator.minimumLowercase = 3;
validator.requireDigit = true;
validator.minimumDigit = 2;
validator.requireSpecialCharacter = true;
validator.minimumSpecialCharacter = 2;
validator.requireMaxNoOfSameConsecutiveCharacters = true;
validator.maximumNoOfSameConsecutiveCharacters = 2;
validator.requireMaxNoOfConsecutiveAscendingDigits = true;
validator.maximumNoOfConsecutiveAscendingDigits = MaxNoOfConsecutiveDigits.Three;
validator.requireMaxNoOfConsecutiveDescendingDigits = true;
validator.maximumNoOfConsecutiveDescendingDigits = MaxNoOfConsecutiveDigits.Three;
validator.requireMaxNoOfConsecutiveAscendingCharacters = true;
validator.maxNoOfConsecutiveAscendingCharacters = MaxNoOfConsecutiveCharacters.Three;
validator.requireMaxNoOfConsecutiveDescendingCharacters = true;
validator.maxNoOfConsecutiveDescendingCharacters = MaxNoOfConsecutiveCharacters.Two;

let password = "P@76abc0rDed123!";

// Validate the password
let isValid: boolean =  validator.PasswordStrength(password);

if (isValid)
{
	console.log("Password meets the strength requirements.");
}
else
{
	console.log("Password does not meet the strength requirements.");
}
```