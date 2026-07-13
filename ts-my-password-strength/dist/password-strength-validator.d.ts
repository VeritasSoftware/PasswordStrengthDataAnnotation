export declare class PasswordStrengthValidator {
    private _bangla;
    private _hindi;
    private _punjabi;
    private _chinese;
    private _korean;
    private _japanese;
    private _urdu;
    private _arabic;
    private _hebrew;
    private _regexPattern;
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
    language: Language;
    getRegexPattern(minLength: number, upper: boolean, minUpper: number, lower: boolean, minLower: number, special: boolean, minSpecialCharacter: number, specialCharacters: string, digit: boolean, minDigit: number, requireMaxNoOfSameConsecutiveCharacters: boolean, maxNoOfSameConsecutiveCharacters: number, requireMaxNoOfConsecutiveAscendingDigits: boolean, maxNoOfConsecutiveAscendingDigits: MaxNoOfConsecutiveDigits, requireMaxNoOfConsecutiveDescendingDigits: boolean, maxNoOfConsecutiveDescendingDigits: MaxNoOfConsecutiveDigits, requireMaxNoOfConsecutiveAscendingCharacters: boolean, maxNoOfConsecutiveAscendingCharacters: MaxNoOfConsecutiveCharacters, requireMaxNoOfConsecutiveDescendingCharacters: boolean, maxNoOfConsecutiveDescendingCharacters: MaxNoOfConsecutiveCharacters, requireRepeatingSequenceCheck: boolean, minLengthOfRepeatingSequence: number): string;
    passwordStrength(password: string): boolean;
    private getMaxConsecutiveAscendingDigitsPattern;
    private getMaxConsecutiveDescendingDigitsPattern;
    private replaceLanguage;
    private convertUnicodeToHexNumber;
    getStartEndList(language: string): string[][];
    private getStartEnd;
    private getMaxConsecutiveCharactersPattern;
    private buildVariants;
    private buildMultilingualVariants;
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
export declare enum Language {
    English = 0,
    Bangla = 1,
    Hindi = 2,
    Punjabi = 3,
    Chinese = 4,
    Korean = 5,
    Japanese = 6,
    Urdu = 7,
    Arabic = 8,
    Hebrew = 9
}
