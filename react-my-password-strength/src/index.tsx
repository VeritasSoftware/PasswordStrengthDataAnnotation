import * as React from 'react'
import { MaxNoOfConsecutiveCharacters, MaxNoOfConsecutiveDigits, PasswordStrengthValidator } from 'ts-my-password-strength'

interface Props {
  strengthOptions: MyPasswordStrengthOptions,
  initialStyleOptions?: React.CSSProperties,
  styleOptions?: React.CSSProperties,
  errorStyleOptions?: React.CSSProperties,
  name?: string,
  placeholder?: string,
  onValidation: (name:string, value:string, isValid:boolean|null) => void
}

export const PasswordStrength = ({ name = "password",
                                    placeholder = "Enter your password", 
                                    strengthOptions = new MyPasswordStrengthOptions(),
                                    initialStyleOptions = {
                                      border: "1px solid #ccc"
                                    }, 
                                    styleOptions = {
                                      border: "1px solid #ccc"
                                    },
                                    errorStyleOptions = {
                                      border:"1px solid red"
                                    }, onValidation }: Props) => {
  const [isValid, setIsValid] = React.useState<boolean | null>(null);
                                      
  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;

    // Consider empty password as valid, as it can be handled separately (e.g. required field validation)
    if (!password || password==='') {
        console.log("Password is empty, skipping validation.");
        setIsValid(null); // Set to null to indicate no validation performed
        onValidation(name, password, null); // Consider empty password as valid for onValidation callback
        return;
    } 
    
    let validator = new PasswordStrengthValidator();

    validator.minimumLength = strengthOptions.minimumLength;
    validator.requireUppercase = strengthOptions.requireUppercase;
    validator.minimumUppercase = strengthOptions.minimumUppercase;
    validator.requireLowercase = strengthOptions.requireLowercase;
    validator.minimumLowercase = strengthOptions.minimumLowercase;
    validator.requireDigit = strengthOptions.requireDigit;
    validator.minimumDigit = strengthOptions.minimumDigit;
    validator.requireSpecialCharacter = strengthOptions.requireSpecialCharacter;
    validator.minimumSpecialCharacter = strengthOptions.minimumSpecialCharacter;
    validator.specialCharacters = strengthOptions.specialCharacters;
    validator.requireMaxNoOfSameConsecutiveCharacters = strengthOptions.requireMaxNoOfSameConsecutiveCharacters;
    validator.maximumNoOfSameConsecutiveCharacters = strengthOptions.maximumNoOfSameConsecutiveCharacters;
    validator.requireMaxNoOfConsecutiveAscendingDigits = strengthOptions.requireMaximumNoOfConsecutiveAscendingDigits;
    validator.maximumNoOfConsecutiveAscendingDigits = strengthOptions.maximumNoOfConsecutiveAscendingDigits as unknown as MaxNoOfConsecutiveDigits;
    validator.requireMaxNoOfConsecutiveDescendingDigits = strengthOptions.requireMaximumNoOfConsecutiveDescendingDigits;
    validator.maximumNoOfConsecutiveDescendingDigits = strengthOptions.maximumNoOfConsecutiveDescendingDigits as unknown as MaxNoOfConsecutiveDigits;
    validator.requireMaxNoOfConsecutiveAscendingCharacters = strengthOptions.requireMaximumNoOfConsecutiveAscendingCharacters;
    validator.maxNoOfConsecutiveAscendingCharacters = strengthOptions.maximumNoOfConsecutiveAscendingCharacters as unknown as MaxNoOfConsecutiveCharacters;
    validator.requireMaxNoOfConsecutiveDescendingCharacters = strengthOptions.requireMaximumNoOfConsecutiveDescendingCharacters;
    validator.maxNoOfConsecutiveDescendingCharacters = strengthOptions.maximumNoOfConsecutiveDescendingCharacters as unknown as MaxNoOfConsecutiveCharacters;
    validator.requireRepeatingSequenceCheck = strengthOptions.requireRepeatingSequenceCheck;
    validator.minLengthOfRepeatingSequence = strengthOptions.minimumLengthOfRepeatingSequence;

    console.log("Validator configuration: ", validator);

    let isValid = validator.passwordStrength(password);
    console.log("Password strength validation result: ", isValid);

    setIsValid(isValid);

    onValidation(name, password, isValid);

    return "";
  };

  console.log("Rendering PasswordStrength component with isValid: ", isValid);

  return <input
            id={name}
            name={name}
            placeholder={placeholder}
            type="password"
            onChange={validatePassword}
            style={ isValid == null ? initialStyleOptions : (isValid ? styleOptions : errorStyleOptions)}
        />
}

export class MyPasswordStrengthOptions {
  minimumLength: number = 6;
  requireLowercase : boolean = true;
  minimumLowercase : number = 1;
  requireDigit : boolean = true;
  minimumDigit : number = 1;
  requireSpecialCharacter : boolean = true;
  minimumSpecialCharacter : number = 1;
  specialCharacters : string = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;
  requireUppercase : boolean = true;
  minimumUppercase : number = 1;
  requireMaxNoOfSameConsecutiveCharacters  : boolean = true;
  maximumNoOfSameConsecutiveCharacters : number = 2;
  requireMaximumNoOfConsecutiveAscendingDigits: boolean = true;
  maximumNoOfConsecutiveAscendingDigits: MaximumNoOfConsecutiveDigits = MaximumNoOfConsecutiveDigits.Two;
  requireMaximumNoOfConsecutiveDescendingDigits: boolean = true;
  maximumNoOfConsecutiveDescendingDigits: MaximumNoOfConsecutiveDigits = MaximumNoOfConsecutiveDigits.Two;
  requireMaximumNoOfConsecutiveAscendingCharacters: boolean = true;
  maximumNoOfConsecutiveAscendingCharacters: MaximumNoOfConsecutiveCharacters = MaximumNoOfConsecutiveCharacters.Two;
  requireMaximumNoOfConsecutiveDescendingCharacters: boolean = true;
  maximumNoOfConsecutiveDescendingCharacters: MaximumNoOfConsecutiveCharacters = MaximumNoOfConsecutiveCharacters.Two;
  requireRepeatingSequenceCheck: boolean = true;
  minimumLengthOfRepeatingSequence: number = 2;   
}

export enum MaximumNoOfConsecutiveDigits {
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5
}

export enum MaximumNoOfConsecutiveCharacters {
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5
}