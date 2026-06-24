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
    requireMaxNoOfConsecutiveAscendingCharacters: boolean;
    maxNoOfConsecutiveAscendingCharacters: MaxNoOfConsecutiveCharacters;
    requireMaxNoOfConsecutiveDescendingCharacters: boolean;
    maxNoOfConsecutiveDescendingCharacters: MaxNoOfConsecutiveCharacters;
    requireRepeatingSequenceCheck: boolean;
    minLengthOfRepeatingSequence: number;
    getRegexPattern(minLength: number, upper: boolean, minUpper: number, lower: boolean, minLower: number, special: boolean, minSpecialCharacter: number, specialCharacters: string, digit: boolean, minDigit: number, requireMaxNoOfSameConsecutiveCharacters: boolean, maxNoOfSameConsecutiveCharacters: number, requireMaxNoOfConsecutiveAscendingDigits: boolean, maxNoOfConsecutiveAscendingDigits: MaxNoOfConsecutiveDigits, requireMaxNoOfConsecutiveDescendingDigits: boolean, maxNoOfConsecutiveDescendingDigits: MaxNoOfConsecutiveDigits, requireMaxNoOfConsecutiveAscendingCharacters: boolean, maxNoOfConsecutiveAscendingCharacters: MaxNoOfConsecutiveCharacters, requireMaxNoOfConsecutiveDescendingCharacters: boolean, maxNoOfConsecutiveDescendingCharacters: MaxNoOfConsecutiveCharacters, requireRepeatingSequenceCheck: boolean, minLengthOfRepeatingSequence: number): string;
    passwordStrength(password: string): boolean;
    private getMaxConsecutiveAscendingDigitsPattern;
    private getMaxConsecutiveDescendingDigitsPattern;
    private getMaxConsecutiveCharactersPattern;
    private buildVariants;
    private generateIncreasingNumbers;
    private generateDecreasingNumbers;
}
export declare enum MaxNoOfConsecutiveDigits {
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5
}
export declare enum MaxNoOfConsecutiveCharacters {
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5
}
