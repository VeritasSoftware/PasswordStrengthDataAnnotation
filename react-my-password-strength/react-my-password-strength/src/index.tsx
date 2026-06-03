import * as React from 'react'
import { PasswordStrengthValidator } from 'ts-my-password-strength'

interface Props {
  strengthOptions: MyPasswordStrengthOptions,
  styleOptions?: React.CSSProperties,
  errorStyleOptions?: React.CSSProperties,
  name?: string,
  onValidation: (name:string, value:string, isValid:boolean) => void
}

export const PasswordStrength = ({ name = "password", 
                                    strengthOptions = new MyPasswordStrengthOptions(), 
                                    styleOptions = {
                                      border: "1px solid #ccc"
                                    },
                                    errorStyleOptions = {
                                      border:"1px solid red"
                                    }, onValidation }: Props) => {
  const [isValid, setIsValid] = React.useState(false);

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;

    if (!password) return "Password is required";
    
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

    console.log("Validator configuration: ", validator);

    let isValid = validator.passwordStrength(password);
    console.log("Password strength validation result: ", isValid);

    setIsValid(isValid);

    onValidation(name, password, isValid);

    return "";
  };

  return <input
            id={name}
            name={name}
            type="password"
            onChange={validatePassword}
            style={isValid ? styleOptions : errorStyleOptions}
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
  specialCharacters : string = '@$!%*?&';
  requireUppercase : boolean = true;
  minimumUppercase : number = 1;
  requireMaxNoOfSameConsecutiveCharacters  : boolean = true;
  maximumNoOfSameConsecutiveCharacters : number = 2;
}
