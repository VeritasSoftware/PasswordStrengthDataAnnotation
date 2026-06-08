export declare class PasswordStrengthValidator {
    minimumLength: number;
    requireUppercase: boolean;
    minimumUppercase: number;
    requireLowercase: boolean;
    minimumLowercase: number;
    requireSpecialCharacter: boolean;
    minimumSpecialCharacter: number;
    specialCharacters: string;
    requireDigit: boolean;
    minimumDigit: number;
    requireMaxNoOfSameConsecutiveCharacters: boolean;
    maximumNoOfSameConsecutiveCharacters: number;
    requireMaxNoOfConsecutiveAscendingDigits: boolean;
    maximumNoOfConsecutiveAscendingDigits: MaxNoOfConsecutiveDigits;
    requireMaxNoOfConsecutiveDescendingDigits: boolean;
    maximumNoOfConsecutiveDescendingDigits: MaxNoOfConsecutiveDigits;
    getRegexPattern(minLength: number, upper: boolean, minUpper: number, lower: boolean, minLower: number, special: boolean, minSpecialCharacter: number, specialCharacters: string, digit: boolean, minDigit: number, requireMaxNoOfSameConsecutiveCharacters: boolean, maxNoOfSameConsecutiveCharacters: number, requireMaxNoOfConsecutiveAscendingDigits: boolean, maxNoOfConsecutiveAscendingDigits: MaxNoOfConsecutiveDigits, requireMaxNoOfConsecutiveDescendingDigits: boolean, maxNoOfConsecutiveDescendingDigits: MaxNoOfConsecutiveDigits): string;
    passwordStrength(password: string): boolean;
    private getMaxConsecutiveAscendingDigitsPattern;
    private getMaxConsecutiveDescendingDigitsPattern;
    private generateIncreasingNumbers;
    private generateDecreasingNumbers;
}
export declare enum MaxNoOfConsecutiveDigits {
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5
}
