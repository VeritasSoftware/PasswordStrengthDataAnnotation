# ts-my-password-strength

[![TypeScript Build & Test](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/node.js.yml/badge.svg)](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/node.js.yml)

|**Packages**|Version|Downloads|
|---------------------------|:---:|:---:|
|*ts-my-password-strength*|[![NPM Version](https://img.shields.io/npm/v/ts-my-password-strength)](https://www.npmjs.com/package/ts-my-password-strength)|[![Downloads count](https://img.shields.io/npm/dy/ts-my-password-strength)](https://www.npmjs.com/package/ts-my-password-strength)|

Define your password strength complexity requirements with ease using the library. 

The package provides a `PasswordStrengthValidator` class that you can use to validate passwords programmatically.

The Validator supports `multilingual` password strength validation too.

You can configure:

* Desired language
* Minimum length
* Minimum upper case characters
* Minimum lower case characters
* Minimum digits
* Minimum special characters
* Maximum same consecutive characters - eg aaa
* Maximum consecutive ascending and/or descending digits - eg 123 / 654
* Maximum consecutive ascending and/or descending characters - eg aBCd / DcbA
* Repeated sequence check - eg in P@ssword@s - @s is repeating sequence

## Programmatic Password Validation

You can validate passwords programmatically using the `PasswordStrengthValidator` class provided in the package.

You can set the password strength requirements through the properties of the `PasswordStrengthValidator` class, 

and then call the `PasswordStrength` method to check if a given password meets those requirements.

The `PasswordStrength` method returns a boolean indicating whether the password is valid according to the configured requirements.

The special characters considered in the validation are: **!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~**. 

You can modify this set of special characters by setting the `specialCharacters` property to a custom string of special characters.

### Sample Usage

First import the validator.

```typescript
import { MaxNoOfConsecutiveCharacters, MaxNoOfConsecutiveDigits, PasswordStrengthValidator } from 'ts-my-password-strength';
```

Then, use it as shown below.

```typescript
// Configure password strength requirements
let validator = new PasswordStrengthValidator();

validator.minimumLength = 9;
validator.requireUppercase = true;
validator.minimumUppercase = 2;
validator.requireLowercase = true;
validator.minimumLowercase = 3;
validator.requireDigit = true;
validator.minimumDigit = 2;
validator.requireSpecialCharacter = true;
validator.minimumSpecialCharacter = 2;
validator.requireMaxNoOfSameConsecutiveCharacters = true;
validator.maximumNoOfSameConsecutiveCharacters = 2;
validator.requireMaxNoOfConsecutiveAscendingDigits = true;
validator.maximumNoOfConsecutiveAscendingDigits = MaxNoOfConsecutiveDigits.Three;
validator.requireMaxNoOfConsecutiveDescendingDigits = true;
validator.maximumNoOfConsecutiveDescendingDigits = MaxNoOfConsecutiveDigits.Two;
validator.requireMaxNoOfConsecutiveAscendingCharacters = true;
validator.maxNoOfConsecutiveAscendingCharacters = MaxNoOfConsecutiveCharacters.Three;
validator.requireMaxNoOfConsecutiveDescendingCharacters = true;
validator.maxNoOfConsecutiveDescendingCharacters = MaxNoOfConsecutiveCharacters.Two;
validator.requireRepeatingSequenceCheck = true;
validator.minLengthOfRepeatingSequence = 2;

let password = "P@76abc0rDed123!";

// Validate the password
let isValid: boolean =  validator.PasswordStrength(password);

if (isValid)
{
	console.log("Password meets the strength requirements.");
}
else
{
	console.log("Password does not meet the strength requirements.");
}
```

### Multilingual feature

The validator supports below languages.

* English (default)
* Bangla
* Hindi
* Punjabi
* Chinese
* Korean
* Japanese
* Urdu
* Arabic
* Hebrew

You can set a property of the validator called `language`.

For languages other than English, properties `requireLowercase` & `minLowercase` do not apply.

Below unit test demonstrates how this feature works:

```typescript
  describe('Multilingual Min No Of Characters', () => {
    test.each([
      ["তুমি কেমন আ1@1", Language.Bangla, true],
      ["তুমি 1@!", Language.Bangla, false],
      ["मेरा पासवर्ड है1@1", Language.Hindi, true],
      ["मेरा1@1", Language.Hindi, false],
      ["ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ?1@1", Language.Punjabi, true],
      ["ਤੁਹਾ1@1", Language.Punjabi, false],
      ["見到你很高興1@!", Language.Chinese, true],
      ["見到你很1@!", Language.Chinese, false],
      ["어떻게 지내세요?1!", Language.Korean, true],
      ["어떻게 지?1!", Language.Korean, false],
      ["おはようございます1@", Language.Japanese, true],
      ["おはよう1@!", Language.Japanese, false],
      ["آپ سے مل کے اچھا لگا1@1", Language.Urdu, true],
      ["پ سے م1314", Language.Urdu, false],
      ["صباح الخيرح1!1", Language.Arabic, true],
      ["صباح1!1", Language.Arabic, false],
      ["1!נעים להכיר אות@אב1@", Language.Hebrew, true],
      ["אב1בא@3", Language.Hebrew, false]
    ])(
      'passwordToTest: "%s" language: %s and expectedResult: %s',
      (passwordToTest, language, expectedResult) => {

          let validator = new PasswordStrengthValidator();
          validator.minimumLength = 6;
          validator.requireDigit = false;
          validator.requireSpecialCharacter = false;
          validator.requireMaxNoOfSameConsecutiveCharacters = false;          
          validator.requireMaxNoOfConsecutiveAscendingCharacters = false;
          validator.requireMaxNoOfConsecutiveDescendingCharacters = false;
          validator.requireMaxNoOfConsecutiveAscendingDigits = false;
          validator.requireMaxNoOfConsecutiveDescendingDigits = false;
          validator.requireLowercase = false;
          validator.requireRepeatingSequenceCheck = false;
          validator.requireUppercase = true;
          validator.minimumUppercase = 5;
          validator.language = language;
  
          let isValid = validator.passwordStrength(passwordToTest);
  
          expect(isValid).toBe(expectedResult);
      }
    );
  });
```