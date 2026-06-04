import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import { MyPasswordStrengthOptions, PasswordStrength } from './index';

const styleOptions={
  border: "1px solid #ccc",
  padding: "8px",
  width: "100%",
}

const errorStyleOptions={
  border:"1px solid red",
  padding: "8px",
  width: "100%",
}

const testBody = (strengthOptions: MyPasswordStrengthOptions, passwordToTest: string, expectedResult: boolean) => {
  let isTestValid = false;  

  const handleOnValidation = (name:string, value:string, isValid:boolean) => {
    console.log(`Validation result for ${name}: ${value} is ${isValid ? 'valid' : 'invalid'}`);
    isTestValid = isValid;
  };

  const { container } = render (
    <PasswordStrength
        name='password' 
        strengthOptions={strengthOptions} 
        styleOptions={styleOptions} 
        errorStyleOptions={errorStyleOptions}
        onValidation={handleOnValidation}
    />
  )

  const input = container.querySelector("input") as HTMLInputElement;
  const inputValue = passwordToTest;

  // Simulate typing
  fireEvent.change(input, { target: { value: inputValue } });

  expect(isTestValid).toBe(expectedResult);
};

describe('Defaults', () => {
  test.each([
    ["Password1!", true], // Valid password
    ["P@ssw0rd", true],  // Valid password with different special character
    ["P@ssw0rd1!!!", false], // More than max same consecutive character
    ["Passsword1!", false], // More than max same consecutive character
    ["password1!", false], // No uppercase letter
    ["PASSWORD1!", false], // No lowercase letter
    ["Password!", false],  // No digit
    ["Password1", false],  // No special character
    ["Pwd1!", false],    // Less than minimum length    
  ])(
    'passwordToTest: "%s" and expectedResult: %s',
    (passwordToTest, expectedResult) => {
      // Configure password strength requirements
      const getOptions = () : MyPasswordStrengthOptions => {
        let options = new MyPasswordStrengthOptions();

        return options;
      };
      testBody(getOptions(), passwordToTest, expectedResult);
    }
  );
});

describe('Max No Of Same Consecutive Characters', () => {
  test.each([
    ["Password1!", true], // Valid password
    ["Passworrd1!", true], // Valid password
    ["Passwordss1!", true], // Valid password
    ["Passsword1!", false],
    ["Passwordsss1!", false],
    ["Password111!", false],
    ["Password1!!!", false],
  ])(
    'passwordToTest: "%s" and expectedResult: %s',
    (passwordToTest, expectedResult) => {
      // Configure password strength requirements
      const getOptions = () : MyPasswordStrengthOptions => {
        let options = new MyPasswordStrengthOptions();

        return options;
      };
      testBody(getOptions(), passwordToTest, expectedResult);
    }
  );
});

describe('Min No Of Lower Case', () => {
  test.each([
    ["PasSwOrd1!", true], // Valid password
    ["PassWORD1!", false]
  ])(
    'passwordToTest: "%s" and expectedResult: %s',
    (passwordToTest, expectedResult) => {

      // Configure password strength requirements
      const getOptions = () : MyPasswordStrengthOptions => {
        let options = new MyPasswordStrengthOptions();
        options.requireDigit = false;
        options.requireSpecialCharacter = false;
        options.requireMaxNoOfSameConsecutiveCharacters = false;
        options.requireUppercase = false;
        options.requireLowercase = true;
        options.minimumLowercase = 5;
        return options;
      };
      testBody(getOptions(), passwordToTest, expectedResult);
    }
  );
});

describe('Min No Of Upper Case', () => {
  test.each([
    ["PaSSwOrD1!", true], // Valid password
    ["PaSSwoRd1!", false]
  ])(
    'passwordToTest: "%s" and expectedResult: %s',
    (passwordToTest, expectedResult) => {
      // Configure password strength requirements
      const getOptions = () : MyPasswordStrengthOptions => {
        let options = new MyPasswordStrengthOptions();
        options.requireDigit = false;
        options.requireSpecialCharacter = false;
        options.requireMaxNoOfSameConsecutiveCharacters = false;
        options.requireLowercase = false;
        options.requireUppercase = true;
        options.minimumUppercase = 5;
        return options;
      };
      testBody(getOptions(), passwordToTest, expectedResult);
    }
  );
});

describe('Min No Of Digits', () => {
  test.each([
    ["Passw0rD1!", true], // Valid password
    ["PaSSwoRd1!", false]
  ])(
    'passwordToTest: "%s" and expectedResult: %s',
    (passwordToTest, expectedResult) => {
      // Configure password strength requirements
      const getOptions = () : MyPasswordStrengthOptions => {
        let options = new MyPasswordStrengthOptions();
        options.requireUppercase = false;
        options.requireSpecialCharacter = false;
        options.requireMaxNoOfSameConsecutiveCharacters = false;
        options.requireLowercase = false;
        options.requireDigit = true;
        options.minimumDigit = 2;
        return options;
      };
      testBody(getOptions(), passwordToTest, expectedResult);
    }
  );
});

describe('Min No Of Special Characters', () => {
  test.each([
    ["P@ssworD1!", true], // Valid password
    ["PaSSwoRd1!", false]
  ])(
    'passwordToTest: "%s" and expectedResult: %s',
    (passwordToTest, expectedResult) => {
      // Configure password strength requirements
      const getOptions = () : MyPasswordStrengthOptions => {
        let options = new MyPasswordStrengthOptions();
        options.requireUppercase = false;
        options.requireDigit = false;
        options.requireMaxNoOfSameConsecutiveCharacters = false;
        options.requireLowercase = false;
        options.requireSpecialCharacter = true;
        options.minimumSpecialCharacter = 2;
        return options;
      };
      testBody(getOptions(), passwordToTest, expectedResult);
    }
  );
});