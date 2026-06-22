import * as React from 'react';
interface Props {
    strengthOptions: MyPasswordStrengthOptions;
    initialStyleOptions?: React.CSSProperties;
    styleOptions?: React.CSSProperties;
    errorStyleOptions?: React.CSSProperties;
    name?: string;
    placeholder?: string;
    onValidation: (name: string, value: string, isValid: boolean | null) => void;
}
export declare const PasswordStrength: ({ name, placeholder, strengthOptions, initialStyleOptions, styleOptions, errorStyleOptions, onValidation }: Props) => React.JSX.Element;
export declare class MyPasswordStrengthOptions {
    minimumLength: number;
    requireLowercase: boolean;
    minimumLowercase: number;
    requireDigit: boolean;
    minimumDigit: number;
    requireSpecialCharacter: boolean;
    minimumSpecialCharacter: number;
    specialCharacters: string;
    requireUppercase: boolean;
    minimumUppercase: number;
    requireMaxNoOfSameConsecutiveCharacters: boolean;
    maximumNoOfSameConsecutiveCharacters: number;
    requireMaximumNoOfConsecutiveAscendingDigits: boolean;
    maximumNoOfConsecutiveAscendingDigits: MaximumNoOfConsecutiveDigits;
    requireMaximumNoOfConsecutiveDescendingDigits: boolean;
    maximumNoOfConsecutiveDescendingDigits: MaximumNoOfConsecutiveDigits;
    requireMaximumNoOfConsecutiveAscendingCharacters: boolean;
    maximumNoOfConsecutiveAscendingCharacters: MaximumNoOfConsecutiveCharacters;
    requireMaximumNoOfConsecutiveDescendingCharacters: boolean;
    maximumNoOfConsecutiveDescendingCharacters: MaximumNoOfConsecutiveCharacters;
}
export declare enum MaximumNoOfConsecutiveDigits {
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5
}
export declare enum MaximumNoOfConsecutiveCharacters {
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5
}
export {};
