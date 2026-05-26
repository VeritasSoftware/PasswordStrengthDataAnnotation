# ts-my-password-strength

Define your password strength complexity requirements with ease using the library. 

The package provides a Validator class that you can use to validate passwords programmatically.

## Programmatic Password Validation

You can validate passwords programmatically using the `PasswordStrengthValidator` class provided in the package.

You can set the password strength requirements through the properties of the `PasswordStrengthValidator` class, 

and then call the `PasswordStrength` method to check if a given password meets those requirements.

The `PasswordStrength` method returns a boolean indicating whether the password is valid according to the configured requirements.

### Sample Usage

```typescript
// Configure password strength requirements
var validator = new PasswordStrengthValidator();

validator.minimumLength = 8;
validator.requireUppercase = true;
validator.minimumUppercase = 2;
validator.requireLowercase = true;
validator.minimumLowercase = 3;
validator.requireDigit = true;
validator.minimumDigit = 2;
validator.requireSpecialCharacter = true;
validator.minSpecialCharacter = 2;
validator.requireMaxNoOfSameConsecutiveCharacters = true;
validator.maxNoOfSameConsecutiveCharacters = 2;

let password = "P@ssw0rD1!";

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

The special characters considered in the validation are: @$!%*?&. 

You can modify this set of special characters by setting the `specialCharacters` property to a custom string of special characters.