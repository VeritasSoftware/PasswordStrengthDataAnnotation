import { describe, expect, test } from '@jest/globals';
import { MaxNoOfConsecutiveDigits, PasswordStrengthValidator } from '../src/password-strength-validator';

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
  
          let isValid = validator.passwordStrength(passwordToTest);
  
          expect(isValid).toBe(expectedResult);
      }
    );
  });

  describe('Max No Of Consecutive Ascending Digits', () => {
    test.each([
      ["Password1!", MaxNoOfConsecutiveDigits.Two, true], // Valid password
      ["Pasword12!", MaxNoOfConsecutiveDigits.Two, true], // Valid password
      ["Pa56word12!", MaxNoOfConsecutiveDigits.Two, true], // Valid password
      ["Pa56word123!", MaxNoOfConsecutiveDigits.Three, true], // Valid password
      ["Pa567word123!", MaxNoOfConsecutiveDigits.Three, true], // Valid password      
      ["Password123!", MaxNoOfConsecutiveDigits.Two, false],
      ["Pa567word12!", MaxNoOfConsecutiveDigits.Two, false],
      ["Pa56word123!", MaxNoOfConsecutiveDigits.Two, false],
      ["Pa567word123!", MaxNoOfConsecutiveDigits.Two, false],
      ["Pa567word1234!", MaxNoOfConsecutiveDigits.Three, false]
    ])(
      'passwordToTest: "%s" maxNoOfConsecutiveDigits: "%s" and expectedResult: %s',
      (passwordToTest, maxNoOfConsecutiveDigits, expectedResult) => {
          let validator = new PasswordStrengthValidator();

          validator.minimumLength = 8;
          validator.requireUppercase = false;
          validator.requireLowercase = false;
          validator.requireDigit = false;
          validator.requireSpecialCharacter = false;
          validator.requireMaxNoOfSameConsecutiveCharacters = false;
          validator.requireMaxNoOfConsecutiveDescendingDigits = false;
          validator.requireMaxNoOfConsecutiveAscendingDigits = true;
          validator.maximumNoOfConsecutiveAscendingDigits = maxNoOfConsecutiveDigits;
  
          let isValid = validator.passwordStrength(passwordToTest);
  
          expect(isValid).toBe(expectedResult);
      }
    );
  });
  
  describe('Max No Of Consecutive Descending Digits', () => {
    test.each([
      ["Password1!", MaxNoOfConsecutiveDigits.Two, true], // Valid password
      ["Password21!", MaxNoOfConsecutiveDigits.Two, true], // Valid password
      ["Pa65word21!", MaxNoOfConsecutiveDigits.Two, true], // Valid password
      ["Pa65word321!", MaxNoOfConsecutiveDigits.Three, true], // Valid password
      ["Pa765word321!", MaxNoOfConsecutiveDigits.Three, true], // Valid password      
      ["Password321!", MaxNoOfConsecutiveDigits.Two, false],
      ["Pa765word21!", MaxNoOfConsecutiveDigits.Two, false],
      ["Pa65word321!", MaxNoOfConsecutiveDigits.Two, false],
      ["Pa765word321!", MaxNoOfConsecutiveDigits.Two, false],
      ["Pa765word4321!", MaxNoOfConsecutiveDigits.Three, false]
    ])(
      'passwordToTest: "%s" maxNoOfConsecutiveDigits: "%s" and expectedResult: %s',
      (passwordToTest, maxNoOfConsecutiveDigits, expectedResult) => {
          let validator = new PasswordStrengthValidator();

          validator.minimumLength = 8;
          validator.requireUppercase = false;
          validator.requireLowercase = false;
          validator.requireDigit = false;
          validator.requireSpecialCharacter = false;
          validator.requireMaxNoOfSameConsecutiveCharacters = false;
          validator.requireMaxNoOfConsecutiveAscendingDigits = false;
          validator.requireMaxNoOfConsecutiveDescendingDigits = true;
          validator.maximumNoOfConsecutiveDescendingDigits = maxNoOfConsecutiveDigits;
  
          let isValid = validator.passwordStrength(passwordToTest);
  
          expect(isValid).toBe(expectedResult);
      }
    );
  });
  
  describe('Max No Of Consecutive Ascending & Descending Digits', () => {
    test.each([
      ["Password1!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, true], // Valid password
      ["Pasword12!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, true], // Valid password
      ["Pasword21!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, true], // Valid password
      ["Pa12word43!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, true], // Valid password
      ["Password1243!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, true], // Valid password
      ["Password123876!", MaxNoOfConsecutiveDigits.Three, MaxNoOfConsecutiveDigits.Three, true], // Valid password
      ["Pa45word87!", MaxNoOfConsecutiveDigits.Three, MaxNoOfConsecutiveDigits.Three, true], // Valid password
      ["Pa456word432!", MaxNoOfConsecutiveDigits.Three, MaxNoOfConsecutiveDigits.Three, true], // Valid password      
      ["Password123!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, false],
      ["Pa987word!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, false],
      ["Pa654word234!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, false],
      ["Pa56word321!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, false],
      ["Pa7654word12!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Three, false],
      ["Password123654!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, false]
    ])(
      'passwordToTest: "%s" maxNoOfConsecutiveDigits: "%s" and expectedResult: %s',
      (passwordToTest, maxNoOfConsecutiveAscendingDigits, maxNoOfConsecutiveDescendingDigits, expectedResult) => {
          let validator = new PasswordStrengthValidator();

          validator.minimumLength = 8;
          validator.requireUppercase = false;
          validator.requireLowercase = false;
          validator.requireDigit = false;
          validator.requireSpecialCharacter = false;
          validator.requireMaxNoOfSameConsecutiveCharacters = false;                    
          validator.requireMaxNoOfConsecutiveAscendingDigits = true;
          validator.maximumNoOfConsecutiveAscendingDigits = maxNoOfConsecutiveAscendingDigits;
          validator.requireMaxNoOfConsecutiveDescendingDigits = true;
          validator.maximumNoOfConsecutiveDescendingDigits = maxNoOfConsecutiveDescendingDigits;
  
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
  
          let isValid = validator.passwordStrength(passwordToTest);
  
          expect(isValid).toBe(expectedResult);
      }
    );
  });