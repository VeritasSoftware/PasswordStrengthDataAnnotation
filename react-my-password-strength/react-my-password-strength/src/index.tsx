import * as React from 'react'
import { PasswordStrengthValidator } from 'ts-my-password-strength'

interface Props {
  passwordStrengthOptions: MyPasswordStrengthOptions,
  styleOptions?: React.CSSProperties,
  errorStyleOptions?: React.CSSProperties,
  name?: string,
  onValidation: (name:string, value:string, isValid:boolean) => void,
  touched?: boolean,
}

export const PasswordStrength = ({ name = "password", 
                                    passwordStrengthOptions = new MyPasswordStrengthOptions(), 
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

    validator.minimumLength = passwordStrengthOptions.minimumLength;
    validator.requireUppercase = passwordStrengthOptions.requireUppercase;
    validator.minimumUppercase = passwordStrengthOptions.minimumUppercase;
    validator.requireLowercase = passwordStrengthOptions.requireLowercase;
    validator.minimumLowercase = passwordStrengthOptions.minimumLowercase;
    validator.requireDigit = passwordStrengthOptions.requireDigit;
    validator.minimumDigit = passwordStrengthOptions.minimumDigit;
    validator.requireSpecialCharacter = passwordStrengthOptions.requireSpecialCharacter;
    validator.minimumSpecialCharacter = passwordStrengthOptions.minimumSpecialCharacter;
    validator.specialCharacters = passwordStrengthOptions.specialCharacters;
    validator.requireMaxNoOfSameConsecutiveCharacters = passwordStrengthOptions.requireMaxNoOfSameConsecutiveCharacters;
    validator.maximumNoOfSameConsecutiveCharacters = passwordStrengthOptions.maximumNoOfSameConsecutiveCharacters;

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
