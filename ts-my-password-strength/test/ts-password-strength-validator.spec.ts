import { describe, expect, test } from '@jest/globals';
import { PasswordStrengthValidator } from '../src/password-strength-validator';

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
        let validator = new PasswordStrengthValidator();

        var pattern = validator.getRegexPattern(validator.minimumLength, validator.requireUppercase, validator.minimumUppercase,
            validator.requireLowercase, validator.minimumLowercase, validator.requireSpecialCharacter, validator.minimumSpecialCharacter, validator.specialCharacters,
            validator.requireDigit, validator.minimumDigit, validator.requireMaxNoOfSameConsecutiveCharacters, validator.maximumNoOfSameConsecutiveCharacters);

        console.log("Regex Pattern: " + pattern);

        let isValid = validator.passwordStrength(passwordToTest);

        expect(isValid).toBe(expectedResult);
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
          let validator = new PasswordStrengthValidator();
  
          var pattern = validator.getRegexPattern(validator.minimumLength, validator.requireUppercase, validator.minimumUppercase,
              validator.requireLowercase, validator.minimumLowercase, validator.requireSpecialCharacter, validator.minimumSpecialCharacter, validator.specialCharacters,
              validator.requireDigit, validator.minimumDigit, validator.requireMaxNoOfSameConsecutiveCharacters, validator.maximumNoOfSameConsecutiveCharacters);
  
          console.log("Regex Pattern: " + pattern);
  
          let isValid = validator.passwordStrength(passwordToTest);
  
          expect(isValid).toBe(expectedResult);
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

          let validator = new PasswordStrengthValidator();
          validator.requireDigit = false;
          validator.requireSpecialCharacter = false;
          validator.requireMaxNoOfSameConsecutiveCharacters = false;
          validator.requireUppercase = false;
          validator.requireLowercase = true;
          validator.minimumLowercase = 5;
  
          var pattern = validator.getRegexPattern(validator.minimumLength, validator.requireUppercase, validator.minimumUppercase,
              validator.requireLowercase, validator.minimumLowercase, validator.requireSpecialCharacter, validator.minimumSpecialCharacter, validator.specialCharacters,
              validator.requireDigit, validator.minimumDigit, validator.requireMaxNoOfSameConsecutiveCharacters, validator.maximumNoOfSameConsecutiveCharacters);
  
          console.log("Regex Pattern: " + pattern);
  
          let isValid = validator.passwordStrength(passwordToTest);
  
          expect(isValid).toBe(expectedResult);
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

          let validator = new PasswordStrengthValidator();
          validator.requireDigit = false;
          validator.requireSpecialCharacter = false;
          validator.requireMaxNoOfSameConsecutiveCharacters = false;
          validator.requireLowercase = false;
          validator.requireUppercase = true;
          validator.minimumUppercase = 5;
  
          var pattern = validator.getRegexPattern(validator.minimumLength, validator.requireUppercase, validator.minimumUppercase,
              validator.requireLowercase, validator.minimumLowercase, validator.requireSpecialCharacter, validator.minimumSpecialCharacter, validator.specialCharacters,
              validator.requireDigit, validator.minimumDigit, validator.requireMaxNoOfSameConsecutiveCharacters, validator.maximumNoOfSameConsecutiveCharacters);
  
          console.log("Regex Pattern: " + pattern);
  
          let isValid = validator.passwordStrength(passwordToTest);
  
          expect(isValid).toBe(expectedResult);
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

          let validator = new PasswordStrengthValidator();
          validator.requireUppercase = false;
          validator.requireSpecialCharacter = false;
          validator.requireMaxNoOfSameConsecutiveCharacters = false;
          validator.requireLowercase = false;
          validator.requireDigit = true;
          validator.minimumDigit = 2;
  
          var pattern = validator.getRegexPattern(validator.minimumLength, validator.requireUppercase, validator.minimumUppercase,
              validator.requireLowercase, validator.minimumLowercase, validator.requireSpecialCharacter, validator.minimumSpecialCharacter, validator.specialCharacters,
              validator.requireDigit, validator.minimumDigit, validator.requireMaxNoOfSameConsecutiveCharacters, validator.maximumNoOfSameConsecutiveCharacters);
  
          console.log("Regex Pattern: " + pattern);
  
          let isValid = validator.passwordStrength(passwordToTest);
  
          expect(isValid).toBe(expectedResult);
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

          let validator = new PasswordStrengthValidator();
          validator.requireUppercase = false;
          validator.requireDigit = false;
          validator.requireMaxNoOfSameConsecutiveCharacters = false;
          validator.requireLowercase = false;
          validator.requireSpecialCharacter = true;
          validator.minimumSpecialCharacter = 2;
  
          var pattern = validator.getRegexPattern(validator.minimumLength, validator.requireUppercase, validator.minimumUppercase,
              validator.requireLowercase, validator.minimumLowercase, validator.requireSpecialCharacter, validator.minimumSpecialCharacter, validator.specialCharacters,
              validator.requireDigit, validator.minimumDigit, validator.requireMaxNoOfSameConsecutiveCharacters, validator.maximumNoOfSameConsecutiveCharacters);
  
          console.log("Regex Pattern: " + pattern);
  
          let isValid = validator.passwordStrength(passwordToTest);
  
          expect(isValid).toBe(expectedResult);
      }
    );
  });