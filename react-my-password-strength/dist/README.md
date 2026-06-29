# react-my-password-strength

[![ReactJS Build & Test](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/react.node.js.yml/badge.svg)](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/react.node.js.yml)

> A React library for validating password strength based on customizable complexity requirements.

## Install

```bash
npm install --save react-my-password-strength
```

Use `--force` option with the above command if you get any version issues.

## Background

Define your password strength complexity requirements with ease using the library. 

The package provides a `PasswordStrength` component that you can use to validate passwords in your react forms.

You can set the password strength requirements through the properties of the `MyPasswordStrengthOptions` class and pass the options to the function.

You can configure:

* Minimum length
* Minimum upper case characters
* Minimum lower case characters
* Minimum digits
* Minimum special characters
* Maximum same consecutive characters - eg aaa
* Maximum consecutive ascending and/or descending digits - eg 123 / 654
* Maximum consecutive ascending and/or descending characters - eg aBCd / DcbA
* Repeated sequence check - eg in P@ssword@s - @s is repeating sequence

The special characters considered in the validation are: **!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~**. 

You can modify this set of special characters by setting the `specialCharacters` property of the options to a custom string of special characters.

### Sample Usage

```tsx
import React, { useState } from 'react'
import { MaximumNoOfConsecutiveCharacters, MaximumNoOfConsecutiveDigits, MyPasswordStrengthOptions, PasswordStrength } from 'react-my-password-strength'

const App = () => {
  const [formData, setFormData] = useState({});
  const [formValid, setFormValid] = useState(false);

  const [isError, setIsError] = useState(false);

  const handleOnValidation = (name:string, value:string, isValid:boolean|null) => {
    if (!isValid && (value === null || value === '')) {
      console.log("Password is empty, skipping validation.");
      setIsError(false);
      setFormValid(false);
      return;
    }

    if (isValid != null)
      setIsError(!isValid);

    setFormData((prev) => ({ ...prev, [name]: value }));
    // Check if all fields are valid
    setFormValid(isValid === true && Object.values(formData).every((v) => v));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (formValid) {
      alert("Form submitted successfully!");
      console.log("Form Data:", formData);
    } else {
      alert("Please fix validation errors before submitting.");
    }
  };


  return (
    <form onSubmit={handleSubmit}>
        <div style={{padding: "20px" }}>
          <div style={{marginRight: "20px" }}>
            <label htmlFor="password" style={{ display: "block", fontWeight: "bold" }}>
              Password
            </label>
            <br />
            <PasswordStrength
                name='password'
                placeholder='Please enter your password'
                strengthOptions={getOptions()}
                initialStyleOptions={initialStyleOptions} 
                styleOptions={styleOptions}                 
                errorStyleOptions={errorStyleOptions}
                onValidation={handleOnValidation}
            />
            <span style={{ fontSize: "12px", color: isError ? "red" : "black" }}>
              Password must have
              <ul>
                  <li>at least 9 chars</li>
                  <li>at least 2 uppercase</li>
                  <li>at least 3 lowercase</li>
                  <li>at least 2 digit</li>
                  <li>at least 2 special char</li>
                  <li>no more than 2 same consecutive chars</li>
                  <li>no more than 3 consecutive ascending digits</li>
                  <li>no more than 2 consecutive descending digits</li>
                  <li>no more than 3 consecutive ascending chars</li>
                  <li>no more than 2 consecutive descending chars</li>
                  <li>no repeating sequence 2 or more chars long</li>
              </ul>
            </span>
          </div>            
          <br />
          <button type="submit" disabled={!formValid} style={{ marginTop: "10px", padding: "8px 16px" }}>
            Submit
          </button>
        </div>
    </form>
  )
}

export default App

// Configure password strength requirements
function getOptions(): MyPasswordStrengthOptions {
  let options = new MyPasswordStrengthOptions();

  options.minimumLength = 9;
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
  options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Two;
  options.requireMaximumNoOfConsecutiveAscendingCharacters = true;
  options.maximumNoOfConsecutiveAscendingCharacters = MaximumNoOfConsecutiveCharacters.Three;
  options.requireMaximumNoOfConsecutiveDescendingCharacters = true;
  options.maximumNoOfConsecutiveDescendingCharacters = MaximumNoOfConsecutiveCharacters.Two;
  options.requireRepeatingSequenceCheck = true;
  options.minimumLengthOfRepeatingSequence = 2;

  return options;
}

const initialStyleOptions={
  border: "1px solid #ccc",
  padding: "8px",
  width: "100%"
}

const styleOptions={
  border: "2px solid green",
  padding: "8px",
  width: "100%"
}

const errorStyleOptions={
  border:"2px solid red",
  padding: "8px",
  width: "100%"
}
```

## License

MIT © [VeritasSoftware](https://github.com/VeritasSoftware)