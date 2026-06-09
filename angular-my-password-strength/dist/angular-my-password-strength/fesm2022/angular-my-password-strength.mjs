import { PasswordStrengthValidator } from 'ts-my-password-strength';

function passwordStrengthValidator(options = new MyPasswordStrengthOptions(), errorKey = "Invalid") {
    return (control) => {
        if (!control.value)
            return null; // don't validate empty values here
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
        validator.requireMaxNoOfConsecutiveAscendingDigits = options.requireMaximumNoOfConsecutiveAscendingDigits;
        validator.maximumNoOfConsecutiveAscendingDigits = options.maximumNoOfConsecutiveAscendingDigits;
        validator.requireMaxNoOfConsecutiveDescendingDigits = options.requireMaximumNoOfConsecutiveDescendingDigits;
        validator.maximumNoOfConsecutiveDescendingDigits = options.maximumNoOfConsecutiveDescendingDigits;
        console.log("Validator configuration: ", validator);
        let isValid = validator.passwordStrength(control.value);
        console.log("Password strength validation result: ", isValid);
        return isValid ? null : { [errorKey]: true };
    };
}
class MyPasswordStrengthOptions {
    minimumLength = 6;
    requireLowercase = true;
    minimumLowercase = 1;
    requireDigit = true;
    minimumDigit = 1;
    requireSpecialCharacter = true;
    minimumSpecialCharacter = 1;
    specialCharacters = '@$!%*?&';
    requireUppercase = true;
    minimumUppercase = 1;
    requireMaxNoOfSameConsecutiveCharacters = true;
    maximumNoOfSameConsecutiveCharacters = 2;
    requireMaximumNoOfConsecutiveAscendingDigits = true;
    maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Two;
    requireMaximumNoOfConsecutiveDescendingDigits = true;
    maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Two;
}
var MaximumNoOfConsecutiveDigits;
(function (MaximumNoOfConsecutiveDigits) {
    MaximumNoOfConsecutiveDigits[MaximumNoOfConsecutiveDigits["Two"] = 2] = "Two";
    MaximumNoOfConsecutiveDigits[MaximumNoOfConsecutiveDigits["Three"] = 3] = "Three";
    MaximumNoOfConsecutiveDigits[MaximumNoOfConsecutiveDigits["Four"] = 4] = "Four";
    MaximumNoOfConsecutiveDigits[MaximumNoOfConsecutiveDigits["Five"] = 5] = "Five";
})(MaximumNoOfConsecutiveDigits || (MaximumNoOfConsecutiveDigits = {}));

/*
 * Public API Surface of angular-my-password-strength
 */

/**
 * Generated bundle index. Do not edit.
 */

export { MaximumNoOfConsecutiveDigits, MyPasswordStrengthOptions, passwordStrengthValidator };
//# sourceMappingURL=angular-my-password-strength.mjs.map
