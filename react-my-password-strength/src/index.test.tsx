import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import { MaximumNoOfConsecutiveCharacters, MaximumNoOfConsecutiveDigits, MyPasswordStrengthOptions, PasswordStrength } from './index';

const initialStyleOptions={
  border: "1px solid #ccc",
  padding: "8px",
  width: "100%"
}

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
  let isTestValid:boolean|null = false;  

  const handleOnValidation = (name:string, value:string, isValid:boolean|null) => {
    console.log(`Validation result for ${name}: ${value} is ${isValid ? 'valid' : 'invalid'}`);
    isTestValid = isValid;
  };

  const { container } = render (
    <PasswordStrength
        name='password'
        placeholder='Please enter your password' 
        strengthOptions={strengthOptions}
        initialStyleOptions={initialStyleOptions} 
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

describe('All Together', () => {
  test.each([
    ["P@76abc0rDed123!", true] // Valid password
  ])(
    'passwordToTest: "%s" and expectedResult: %s',
    (passwordToTest, expectedResult) => {
      // Configure password strength requirements
      const getOptions = () : MyPasswordStrengthOptions => {
        let options = new MyPasswordStrengthOptions();

        options.minimumLength = 8;
        options.requireUppercase = true;
        options.minimumUppercase = 2;
        options.requireLowercase = true;
        options.minimumLowercase = 3;
        options.requireDigit = true;
        options.minimumDigit = 2;
        options.requireSpecialCharacter = true;
        options.minimumSpecialCharacter = 2;
        options.requireMaxNoOfSameConsecutiveCharacters = true;
        options.maximumNoOfSameConsecutiveCharacters = 2;
        options.requireMaximumNoOfConsecutiveAscendingDigits = true;
        options.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Three;
        options.requireMaximumNoOfConsecutiveDescendingDigits = true;
        options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Three;
        options.requireMaximumNoOfConsecutiveAscendingCharacters = true;
        options.maximumNoOfConsecutiveAscendingCharacters = MaximumNoOfConsecutiveCharacters.Three;
        options.requireMaximumNoOfConsecutiveDescendingCharacters = true;
        options.maximumNoOfConsecutiveDescendingCharacters = MaximumNoOfConsecutiveCharacters.Two;
        
        return options;
      };
      testBody(getOptions(), passwordToTest, expectedResult);
    }
  );
});

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

describe('Max No Of Consecutive Ascending Digits', () => {
  test.each([
    ["Password1!", MaximumNoOfConsecutiveDigits.Two, true], // Valid password
    ["Pasword12!", MaximumNoOfConsecutiveDigits.Two, true], // Valid password
    ["Pa56word12!", MaximumNoOfConsecutiveDigits.Two, true], // Valid password
    ["Pa56word123!", MaximumNoOfConsecutiveDigits.Three, true], // Valid password
    ["Pa567word123!", MaximumNoOfConsecutiveDigits.Three, true], // Valid password      
    ["Password123!", MaximumNoOfConsecutiveDigits.Two, false],
    ["Pa567word12!", MaximumNoOfConsecutiveDigits.Two, false],
    ["Pa56word123!", MaximumNoOfConsecutiveDigits.Two, false],
    ["Pa567word123!", MaximumNoOfConsecutiveDigits.Two, false],
    ["Pa567word1234!", MaximumNoOfConsecutiveDigits.Three, false]
  ])(
    'passwordToTest: "%s" maxNoOfConsecutiveDigits: "%s" and expectedResult: %s',
    (passwordToTest, maxNoOfConsecutiveDigits, expectedResult) => {
      // Configure password strength requirements
      const getOptions = () : MyPasswordStrengthOptions => {
        let options = new MyPasswordStrengthOptions();

        options.minimumLength = 8;
        options.requireUppercase = false;
        options.requireLowercase = false;
        options.requireDigit = false;
        options.requireSpecialCharacter = false;
        options.requireMaxNoOfSameConsecutiveCharacters = false;
        options.requireMaximumNoOfConsecutiveDescendingDigits = false;
        options.requireMaximumNoOfConsecutiveAscendingDigits = true;
        options.maximumNoOfConsecutiveAscendingDigits = maxNoOfConsecutiveDigits;
        
        return options;
      };
      testBody(getOptions(), passwordToTest, expectedResult);
    }
  );
});

describe('Max No Of Consecutive Descending Digits', () => {
  test.each([
    ["Password1!", MaximumNoOfConsecutiveDigits.Two, true], // Valid password
    ["Password21!", MaximumNoOfConsecutiveDigits.Two, true], // Valid password
    ["Pa65word21!", MaximumNoOfConsecutiveDigits.Two, true], // Valid password
    ["Pa65word321!", MaximumNoOfConsecutiveDigits.Three, true], // Valid password
    ["Pa765word321!", MaximumNoOfConsecutiveDigits.Three, true], // Valid password      
    ["Password321!", MaximumNoOfConsecutiveDigits.Two, false],
    ["Pa765word21!", MaximumNoOfConsecutiveDigits.Two, false],
    ["Pa65word321!", MaximumNoOfConsecutiveDigits.Two, false],
    ["Pa765word321!", MaximumNoOfConsecutiveDigits.Two, false],
    ["Pa765word4321!", MaximumNoOfConsecutiveDigits.Three, false]
  ])(
    'passwordToTest: "%s" maxNoOfConsecutiveDigits: "%s" and expectedResult: %s',
    (passwordToTest, maxNoOfConsecutiveDigits, expectedResult) => {
      // Configure password strength requirements
      const getOptions = () : MyPasswordStrengthOptions => {
        let options = new MyPasswordStrengthOptions();

        options.minimumLength = 8;
        options.requireUppercase = false;
        options.requireLowercase = false;
        options.requireDigit = false;
        options.requireSpecialCharacter = false;
        options.requireMaxNoOfSameConsecutiveCharacters = false;        
        options.requireMaximumNoOfConsecutiveAscendingDigits = false;
        options.requireMaximumNoOfConsecutiveDescendingDigits = true;
        options.maximumNoOfConsecutiveDescendingDigits = maxNoOfConsecutiveDigits;
        
        return options;
      };
      testBody(getOptions(), passwordToTest, expectedResult);
    }
  );
});

describe('Max No Of Consecutive Ascending & Descending Digits', () => {
  test.each([
    ["Password1!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, true], // Valid password
    ["Pasword12!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, true], // Valid password
    ["Pasword21!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, true], // Valid password
    ["Pa12word43!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, true], // Valid password
    ["Password1243!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, true], // Valid password
    ["Password123876!", MaximumNoOfConsecutiveDigits.Three, MaximumNoOfConsecutiveDigits.Three, true], // Valid password
    ["Pa45word87!", MaximumNoOfConsecutiveDigits.Three, MaximumNoOfConsecutiveDigits.Three, true], // Valid password
    ["Pa456word432!", MaximumNoOfConsecutiveDigits.Three, MaximumNoOfConsecutiveDigits.Three, true], // Valid password      
    ["Password123!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, false],
    ["Pa987word!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, false],
    ["Pa654word234!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, false],
    ["Pa56word321!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, false],
    ["Pa7654word12!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Three, false],
    ["Password123654!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, false]
  ])(
    'passwordToTest: "%s" maxNoOfConsecutiveAscendingDigits: "%s" maxNoOfConsecutiveDescendingDigits: "%s" and expectedResult: %s',
    (passwordToTest, maxNoOfConsecutiveAscendingDigits, maxNoOfConsecutiveDescendingDigits, expectedResult) => {
      // Configure password strength requirements
      const getOptions = () : MyPasswordStrengthOptions => {
        let options = new MyPasswordStrengthOptions();

        options.minimumLength = 8;
        options.requireUppercase = false;
        options.requireLowercase = false;
        options.requireDigit = false;
        options.requireSpecialCharacter = false;
        options.requireMaxNoOfSameConsecutiveCharacters = false;        
        options.requireMaximumNoOfConsecutiveAscendingDigits = true;
        options.maximumNoOfConsecutiveAscendingDigits = maxNoOfConsecutiveAscendingDigits;
        options.requireMaximumNoOfConsecutiveDescendingDigits = true;
        options.maximumNoOfConsecutiveDescendingDigits = maxNoOfConsecutiveDescendingDigits;
        
        return options;
      };
      testBody(getOptions(), passwordToTest, expectedResult);
    }
  );
});

describe('Max No Of Consecutive Ascending & Descending Characters', () => {
  test.each([
    ["Password1!", MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, true], // Valid password
    ["Pabword1!", MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, true], // Valid password
    ["PABcdworDCa1!", MaximumNoOfConsecutiveCharacters.Four, MaximumNoOfConsecutiveCharacters.Two, true], // Valid password
    ["Pabwordc1!", MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, true], // Valid password
    ["Pabwordcb1!", MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Three, true], // Valid password
    ["Pabcwordcb1!", MaximumNoOfConsecutiveCharacters.Three, MaximumNoOfConsecutiveCharacters.Three, true], // Valid password
    ["PAbCdwordCBa1!", MaximumNoOfConsecutiveCharacters.Four, MaximumNoOfConsecutiveCharacters.Four, true], // Valid password
    ["PABcdworDCa1!", MaximumNoOfConsecutiveCharacters.Four, MaximumNoOfConsecutiveCharacters.Three, true], // Valid password      
    ["PABcdworDCa1!", MaximumNoOfConsecutiveCharacters.Four, MaximumNoOfConsecutiveCharacters.Two, true], // Valid password
    ["Pabcword1!", MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false],
    ["Passwordcb1!", MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false],
    ["PaBcwordCb1!", MaximumNoOfConsecutiveCharacters.Three, MaximumNoOfConsecutiveCharacters.Two, false],
    ["PAbCdwordbCa1!", MaximumNoOfConsecutiveCharacters.Three, MaximumNoOfConsecutiveCharacters.Three, false],
    ["PaBcwordC1!", MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false]
  ])(
    'passwordToTest: "%s" maxNoOfConsecutiveAscendingCharacters: %s maxNoOfConsecutiveDescendingCharacters: %s and expectedResult: %s',
    (passwordToTest, maxNoOfConsecutiveAscendingCharacters, maxNoOfConsecutiveDescendingCharacters, expectedResult) => {
      // Configure password strength requirements
      const getOptions = () : MyPasswordStrengthOptions => {
        let options = new MyPasswordStrengthOptions();

        options.minimumLength = 8;
        options.requireUppercase = false;
        options.requireLowercase = false;
        options.requireDigit = false;
        options.requireSpecialCharacter = false;
        options.requireMaxNoOfSameConsecutiveCharacters = false;        
        options.requireMaximumNoOfConsecutiveAscendingDigits = false;
        options.requireMaximumNoOfConsecutiveDescendingDigits = false;
        options.requireMaximumNoOfConsecutiveAscendingCharacters = true;
        options.maximumNoOfConsecutiveAscendingCharacters = maxNoOfConsecutiveAscendingCharacters; 
        options.requireMaximumNoOfConsecutiveDescendingCharacters = true;       
        options.maximumNoOfConsecutiveDescendingCharacters = maxNoOfConsecutiveDescendingCharacters;
        
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