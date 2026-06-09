import { useState, createElement } from 'react';
import { PasswordStrengthValidator } from 'ts-my-password-strength';

var PasswordStrength = function PasswordStrength(_ref) {
  var _ref$name = _ref.name,
    name = _ref$name === void 0 ? "password" : _ref$name,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? "Enter your password" : _ref$placeholder,
    _ref$strengthOptions = _ref.strengthOptions,
    strengthOptions = _ref$strengthOptions === void 0 ? new MyPasswordStrengthOptions() : _ref$strengthOptions,
    _ref$initialStyleOpti = _ref.initialStyleOptions,
    initialStyleOptions = _ref$initialStyleOpti === void 0 ? {
      border: "1px solid #ccc"
    } : _ref$initialStyleOpti,
    _ref$styleOptions = _ref.styleOptions,
    styleOptions = _ref$styleOptions === void 0 ? {
      border: "1px solid #ccc"
    } : _ref$styleOptions,
    _ref$errorStyleOption = _ref.errorStyleOptions,
    errorStyleOptions = _ref$errorStyleOption === void 0 ? {
      border: "1px solid red"
    } : _ref$errorStyleOption,
    onValidation = _ref.onValidation;
  var _React$useState = useState(null),
    isValid = _React$useState[0],
    setIsValid = _React$useState[1];
  var validatePassword = function validatePassword(e) {
    var password = e.target.value;
    if (!password || password === '') {
      console.log("Password is empty, skipping validation.");
      setIsValid(null);
      onValidation(name, password, null);
      return;
    }
    var validator = new PasswordStrengthValidator();
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
    validator.maximumNoOfConsecutiveAscendingDigits = strengthOptions.maximumNoOfConsecutiveAscendingDigits;
    validator.requireMaxNoOfConsecutiveDescendingDigits = strengthOptions.requireMaximumNoOfConsecutiveDescendingDigits;
    validator.maximumNoOfConsecutiveDescendingDigits = strengthOptions.maximumNoOfConsecutiveDescendingDigits;
    console.log("Validator configuration: ", validator);
    var isValid = validator.passwordStrength(password);
    console.log("Password strength validation result: ", isValid);
    setIsValid(isValid);
    onValidation(name, password, isValid);
    return "";
  };
  console.log("Rendering PasswordStrength component with isValid: ", isValid);
  return createElement("input", {
    id: name,
    name: name,
    placeholder: placeholder,
    type: "password",
    onChange: validatePassword,
    style: isValid == null ? initialStyleOptions : isValid ? styleOptions : errorStyleOptions
  });
};
var MyPasswordStrengthOptions = function MyPasswordStrengthOptions() {
  this.minimumLength = 6;
  this.requireLowercase = true;
  this.minimumLowercase = 1;
  this.requireDigit = true;
  this.minimumDigit = 1;
  this.requireSpecialCharacter = true;
  this.minimumSpecialCharacter = 1;
  this.specialCharacters = '@$!%*?&';
  this.requireUppercase = true;
  this.minimumUppercase = 1;
  this.requireMaxNoOfSameConsecutiveCharacters = true;
  this.maximumNoOfSameConsecutiveCharacters = 2;
  this.requireMaximumNoOfConsecutiveAscendingDigits = true;
  this.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Two;
  this.requireMaximumNoOfConsecutiveDescendingDigits = true;
  this.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Two;
};
var MaximumNoOfConsecutiveDigits;
(function (MaximumNoOfConsecutiveDigits) {
  MaximumNoOfConsecutiveDigits[MaximumNoOfConsecutiveDigits["Two"] = 2] = "Two";
  MaximumNoOfConsecutiveDigits[MaximumNoOfConsecutiveDigits["Three"] = 3] = "Three";
  MaximumNoOfConsecutiveDigits[MaximumNoOfConsecutiveDigits["Four"] = 4] = "Four";
  MaximumNoOfConsecutiveDigits[MaximumNoOfConsecutiveDigits["Five"] = 5] = "Five";
})(MaximumNoOfConsecutiveDigits || (MaximumNoOfConsecutiveDigits = {}));

export { MaximumNoOfConsecutiveDigits, MyPasswordStrengthOptions, PasswordStrength };
//# sourceMappingURL=index.modern.js.map
