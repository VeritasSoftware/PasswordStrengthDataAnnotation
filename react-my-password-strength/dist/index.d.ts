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
}
export {};
