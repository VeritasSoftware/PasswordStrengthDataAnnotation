export class PasswordStrengthValidator {

    minimumLength: number = 6;
    requireUppercase: boolean = true;
    minimumUppercase: number = 1;
    requireLowercase: boolean = true;
    minimumLowercase: number = 1;
    requireSpecialCharacter: boolean = true;
    minimumSpecialCharacter: number = 1;
    specialCharacters: string = "@$!%*?&";
    requireDigit: boolean = true;
    minimumDigit: number = 1;
    requireMaxNoOfSameConsecutiveCharacters: boolean = true
    maximumNoOfSameConsecutiveCharacters: number = 2;
    requireMaxNoOfConsecutiveAscendingDigits: boolean = true;
    maximumNoOfConsecutiveAscendingDigits: MaxNoOfConsecutiveDigits = MaxNoOfConsecutiveDigits.Two;
    requireMaxNoOfConsecutiveDescendingDigits: boolean = true;
    maximumNoOfConsecutiveDescendingDigits: MaxNoOfConsecutiveDigits = MaxNoOfConsecutiveDigits.Two;

    getRegexPattern (minLength: number, upper: boolean, minUpper: number, 
                    lower: boolean, minLower: number,  special: boolean, minSpecialCharacter: number, specialCharacters: string,
                    digit: boolean, minDigit: number, requireMaxNoOfSameConsecutiveCharacters: boolean, maxNoOfSameConsecutiveCharacters: number,
                    requireMaxNoOfConsecutiveAscendingDigits: boolean, maxNoOfConsecutiveAscendingDigits: MaxNoOfConsecutiveDigits,
                    requireMaxNoOfConsecutiveDescendingDigits: boolean, maxNoOfConsecutiveDescendingDigits: MaxNoOfConsecutiveDigits): string {
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
            pattern += "(?!^(.*?\\d(" + this.getMaxConsecutiveAscendingDigitsPattern(<number>maxNoOfConsecutiveAscendingDigits) + "))+)"; // Max no of consecutive ascending digits
        if (requireMaxNoOfConsecutiveDescendingDigits)
            pattern += "(?!^(.*?\\d(" + this.getMaxConsecutiveDescendingDigitsPattern(<number>maxNoOfConsecutiveDescendingDigits) + "))+)"; // Max no of consecutive descending digits
        pattern += ".{" + minLength + ",}$"; // Minimum length
        return pattern;         
    }

    passwordStrength(password: string): boolean {
        if (!password) {
            return false;
        }

        const regexPattern = this.getRegexPattern(this.minimumLength, this.requireUppercase, this.minimumUppercase,
            this.requireLowercase, this.minimumLowercase, this.requireSpecialCharacter, this.minimumSpecialCharacter, this.specialCharacters,
            this.requireDigit, this.minimumDigit, this.requireMaxNoOfSameConsecutiveCharacters, this.maximumNoOfSameConsecutiveCharacters,
            this.requireMaxNoOfConsecutiveAscendingDigits, this.maximumNoOfConsecutiveAscendingDigits,
            this.requireMaxNoOfConsecutiveDescendingDigits, this.maximumNoOfConsecutiveDescendingDigits);

        const regex = new RegExp(regexPattern);

        return regex.test(password);
    }

    private getMaxConsecutiveAscendingDigitsPattern(length: number): string {
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
    
    private getMaxConsecutiveDescendingDigitsPattern(length: number): string {
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

    private generateIncreasingNumbers(start: number, length: number): number[] {
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

    private generateDecreasingNumbers(start: number, length: number): number[] {
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

export enum MaxNoOfConsecutiveDigits {
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5
}