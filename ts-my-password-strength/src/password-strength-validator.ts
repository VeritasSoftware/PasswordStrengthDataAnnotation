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

    getRegexPattern (minLength: number, upper: boolean, minUpper: number, 
                    lower: boolean, minLower: number,  special: boolean, minSpecialCharacter: number, specialCharacters: string,
                    digit: boolean, minDigit: number, requireMaxNoOfSameConsecutiveCharacters: boolean, maxNoOfSameConsecutiveCharacters: number): string {
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
        pattern += ".{" + minLength + ",}$"; // Minimum length
        return pattern;         
    }

    passwordStrength(password: string): boolean {
        if (!password) {
            return false;
        }

        const regexPattern = this.getRegexPattern(this.minimumLength, this.requireUppercase, this.minimumUppercase,
            this.requireLowercase, this.minimumLowercase, this.requireSpecialCharacter, this.minimumSpecialCharacter, this.specialCharacters,
            this.requireDigit, this.minimumDigit, this.requireMaxNoOfSameConsecutiveCharacters, this.maximumNoOfSameConsecutiveCharacters);

        const regex = new RegExp(regexPattern);

        return regex.test(password);
    }
}