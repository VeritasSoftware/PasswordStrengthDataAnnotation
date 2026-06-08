"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxNoOfConsecutiveDigits = exports.PasswordStrengthValidator = void 0;
class PasswordStrengthValidator {
    constructor() {
        this.minimumLength = 6;
        this.requireUppercase = true;
        this.minimumUppercase = 1;
        this.requireLowercase = true;
        this.minimumLowercase = 1;
        this.requireSpecialCharacter = true;
        this.minimumSpecialCharacter = 1;
        this.specialCharacters = "@$!%*?&";
        this.requireDigit = true;
        this.minimumDigit = 1;
        this.requireMaxNoOfSameConsecutiveCharacters = true;
        this.maximumNoOfSameConsecutiveCharacters = 2;
        this.requireMaxNoOfConsecutiveAscendingDigits = true;
        this.maximumNoOfConsecutiveAscendingDigits = MaxNoOfConsecutiveDigits.Two;
        this.requireMaxNoOfConsecutiveDescendingDigits = true;
        this.maximumNoOfConsecutiveDescendingDigits = MaxNoOfConsecutiveDigits.Two;
    }
    getRegexPattern(minLength, upper, minUpper, lower, minLower, special, minSpecialCharacter, specialCharacters, digit, minDigit, requireMaxNoOfSameConsecutiveCharacters, maxNoOfSameConsecutiveCharacters, requireMaxNoOfConsecutiveAscendingDigits, maxNoOfConsecutiveAscendingDigits, requireMaxNoOfConsecutiveDescendingDigits, maxNoOfConsecutiveDescendingDigits) {
        let pattern = "^";
        if (upper)
            pattern += "(?=(.*?[A-Z]){" + minUpper + ",})"; // min no of uppercase letter
        if (lower)
            pattern += "(?=(.*?[a-z]){" + minLower + ",})"; // min no of lowercase letter
        if (digit)
            pattern += "(?=(.*?\\d){" + minDigit + ",})"; // min no of digit
        if (special)
            pattern += "(?=(.*?[" + specialCharacters + "]){" + minSpecialCharacter + ",})"; // min no of special character
        if (requireMaxNoOfSameConsecutiveCharacters)
            pattern += "(?=^((?<currentChar>.)(?!\\k<currentChar>{" + maxNoOfSameConsecutiveCharacters + "}))+$)"; //max no of same consecutive characters
        if (requireMaxNoOfConsecutiveAscendingDigits)
            pattern += "(?!^(.*?(" + this.getMaxConsecutiveAscendingDigitsPattern(maxNoOfConsecutiveAscendingDigits + 1) + "))+)"; // Max no of consecutive ascending digits
        if (requireMaxNoOfConsecutiveDescendingDigits)
            pattern += "(?!^(.*?(" + this.getMaxConsecutiveDescendingDigitsPattern(maxNoOfConsecutiveDescendingDigits + 1) + "))+)"; // Max no of consecutive descending digits
        pattern += ".{" + minLength + ",}$"; // Minimum length
        return pattern;
    }
    passwordStrength(password) {
        if (!password) {
            return false;
        }
        const regexPattern = this.getRegexPattern(this.minimumLength, this.requireUppercase, this.minimumUppercase, this.requireLowercase, this.minimumLowercase, this.requireSpecialCharacter, this.minimumSpecialCharacter, this.specialCharacters, this.requireDigit, this.minimumDigit, this.requireMaxNoOfSameConsecutiveCharacters, this.maximumNoOfSameConsecutiveCharacters, this.requireMaxNoOfConsecutiveAscendingDigits, this.maximumNoOfConsecutiveAscendingDigits, this.requireMaxNoOfConsecutiveDescendingDigits, this.maximumNoOfConsecutiveDescendingDigits);
        const regex = new RegExp(regexPattern);
        return regex.test(password);
    }
    getMaxConsecutiveAscendingDigitsPattern(length) {
        var numbers = this.generateIncreasingNumbers(0, 10); // Generate numbers from 0 to 9
        var patterns = numbers.map(num => {
            let pattern = "";
            for (let i = 0; i < length; i++) {
                pattern += (num + i) % 10; // Wrap around using modulo
            }
            return pattern;
        });
        return patterns.join("|"); // Join all patterns with OR operator
    }
    getMaxConsecutiveDescendingDigitsPattern(length) {
        var numbers = this.generateDecreasingNumbers(9, 10); // Generate numbers from 9 to 0
        var patterns = numbers.map(num => {
            let pattern = "";
            for (let i = 0; i < length; i++) {
                pattern += (num - i + 10) % 10; // Wrap around using modulo
            }
            return pattern;
        });
        return patterns.join("|"); // Join all patterns with OR operator
    }
    generateIncreasingNumbers(start, length) {
        // Validate inputs
        if (typeof start !== 'number' || typeof length !== 'number') {
            throw new TypeError('Both start and length must be numbers.');
        }
        if (!Number.isInteger(length) || length < 0) {
            throw new RangeError('Length must be a non-negative integer.');
        }
        // Generate array using Array.from
        return Array.from({ length }, (_, index) => start + index);
    }
    generateDecreasingNumbers(start, length) {
        // Validate inputs
        if (typeof start !== 'number' || typeof length !== 'number') {
            throw new TypeError('Both start and length must be numbers.');
        }
        if (!Number.isInteger(length) || length < 0) {
            throw new RangeError('Length must be a non-negative integer.');
        }
        // Generate array using Array.from
        return Array.from({ length }, (_, index) => (start - index + 10) % 10); // Wrap around using modulo
    }
}
exports.PasswordStrengthValidator = PasswordStrengthValidator;
var MaxNoOfConsecutiveDigits;
(function (MaxNoOfConsecutiveDigits) {
    MaxNoOfConsecutiveDigits[MaxNoOfConsecutiveDigits["Two"] = 2] = "Two";
    MaxNoOfConsecutiveDigits[MaxNoOfConsecutiveDigits["Three"] = 3] = "Three";
    MaxNoOfConsecutiveDigits[MaxNoOfConsecutiveDigits["Four"] = 4] = "Four";
    MaxNoOfConsecutiveDigits[MaxNoOfConsecutiveDigits["Five"] = 5] = "Five";
})(MaxNoOfConsecutiveDigits || (exports.MaxNoOfConsecutiveDigits = MaxNoOfConsecutiveDigits = {}));
