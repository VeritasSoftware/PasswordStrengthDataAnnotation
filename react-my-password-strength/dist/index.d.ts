import * as React from 'react';
interface Props {
    strengthOptions: MyPasswordStrengthOptions;
    styleOptions?: React.CSSProperties;
    errorStyleOptions?: React.CSSProperties;
    name?: string;
    onValidation: (name: string, value: string, isValid: boolean) => void;
}
export declare const PasswordStrength: ({ name, strengthOptions, styleOptions, errorStyleOptions, onValidation }: Props) => React.JSX.Element;
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
