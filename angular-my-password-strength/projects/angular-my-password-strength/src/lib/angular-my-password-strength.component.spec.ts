import { FormControl } from '@angular/forms';
import { MaximumNoOfConsecutiveDigits, MyPasswordStrengthOptions, passwordStrengthValidator } from './angular-my-password-strength.component';

describe('Defaults', () => {
  const validatorFn = passwordStrengthValidator();

  it('Valid password', () => {
    const control = new FormControl('Password1!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Valid password with different special character', () => {
    const control = new FormControl('P@ssw0rd');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Invalid password with more than max same consecutive character - 1', () => {
    const control = new FormControl('P@ssw0rd1!!!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password with more than max same consecutive character - 2', () => {
    const control = new FormControl('Passsword1!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password with no uppercase letter', () => {
    const control = new FormControl('password1!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password with no lowercase letter', () => {
    const control = new FormControl('PASSWORD1!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password with no digit', () => {
    const control = new FormControl('Password!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password with no special character', () => {
    const control = new FormControl('Password1');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password with less than minimum length', () => {
    const control = new FormControl('Pwd1!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
});

describe('Max No Of Same Consecutive Characters', () => {
  const validatorFn = passwordStrengthValidator();

  it('Valid password', () => {
    const control = new FormControl('Password1!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Invalid password', () => {
    const control = new FormControl('P@ssw0rd1!!!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
});

describe('Max No Of Consecutive Ascending Digits', () => {
  let options = new MyPasswordStrengthOptions();

  options.requireDigit = false;
  options.requireSpecialCharacter = false;
  options.requireMaxNoOfSameConsecutiveCharacters = false;
  options.requireUppercase = false;
  options.requireLowercase = false;
  options.requireMaximumNoOfConsecutiveDescendingDigits = false;
  options.requireMaximumNoOfConsecutiveAscendingDigits = true;  

  const validatorFn = passwordStrengthValidator(options);  

  it('Valid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = 2;
    const control = new FormControl('Password1!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Valid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = 2;
    const control = new FormControl('Password12!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Valid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = 2;
    const control = new FormControl('Pa56word12!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Valid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = 3;
    const control = new FormControl('Pa56word123!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Valid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = 3;
    const control = new FormControl('Pa567word123!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Invalid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = 2;
    const control = new FormControl('Password123!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = 2;
    const control = new FormControl('Pa567word12!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = 2;
    const control = new FormControl('Pa56word123!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = 2;
    const control = new FormControl('Pa567word123!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = 3;
    const control = new FormControl('Pa567word1234!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
});

describe('Max No Of Consecutive Descending Digits', () => {
  let options = new MyPasswordStrengthOptions();

  options.requireDigit = false;
  options.requireSpecialCharacter = false;
  options.requireMaxNoOfSameConsecutiveCharacters = false;
  options.requireUppercase = false;
  options.requireLowercase = false;
  options.requireMaximumNoOfConsecutiveAscendingDigits = false;
  options.requireMaximumNoOfConsecutiveDescendingDigits = true;  

  const validatorFn = passwordStrengthValidator(options);  

  it('Valid password', () => {
    options.maximumNoOfConsecutiveDescendingDigits = 2;
    const control = new FormControl('Password1!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Valid password', () => {
    options.maximumNoOfConsecutiveDescendingDigits = 2;
    const control = new FormControl('Password21!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Valid password', () => {
    options.maximumNoOfConsecutiveDescendingDigits = 2;
    const control = new FormControl('Pa65word21!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Valid password', () => {
    options.maximumNoOfConsecutiveDescendingDigits = 3;
    const control = new FormControl('Pa65word321!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Valid password', () => {
    options.maximumNoOfConsecutiveDescendingDigits = 3;
    const control = new FormControl('Pa765word321!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Invalid password', () => {
    options.maximumNoOfConsecutiveDescendingDigits = 2;
    const control = new FormControl('Password321!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password', () => {
    options.maximumNoOfConsecutiveDescendingDigits = 2;
    const control = new FormControl('Pa765word21!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password', () => {
    options.maximumNoOfConsecutiveDescendingDigits = 2;
    const control = new FormControl('Pa65word321!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password', () => {
    options.maximumNoOfConsecutiveDescendingDigits = 2;
    const control = new FormControl('Pa765word321!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password', () => {
    options.maximumNoOfConsecutiveDescendingDigits = 3;
    const control = new FormControl('Pa765word4321!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
});

describe('Max No Of Consecutive Ascending & Descending Digits', () => {
  let options = new MyPasswordStrengthOptions();

  options.requireDigit = false;
  options.requireSpecialCharacter = false;
  options.requireMaxNoOfSameConsecutiveCharacters = false;
  options.requireUppercase = false;
  options.requireLowercase = false;
  options.requireMaximumNoOfConsecutiveAscendingDigits = true;
  options.requireMaximumNoOfConsecutiveDescendingDigits = true;  

  const validatorFn = passwordStrengthValidator(options);  

  it('Valid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Two;
    options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Two;
    const control = new FormControl('Password1!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Valid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Two;
    options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Two;
    const control = new FormControl('Pasword12!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Valid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Two;
    options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Two;
    const control = new FormControl('Pasword21!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Valid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Two;
    options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Two;
    const control = new FormControl('Pa12word43!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Valid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Two;
    options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Two;
    const control = new FormControl('Password1243!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Valid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Three;
    options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Three;
    const control = new FormControl('Password123876!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Valid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Three;
    options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Three;
    const control = new FormControl('Pa45word87!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Valid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Three;
    options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Three;
    const control = new FormControl('Pa456word432!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Invalid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Two;
    options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Two;
    const control = new FormControl('Password123!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Two;
    options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Two;
    const control = new FormControl('Pa987word!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Two;
    options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Two;
    const control = new FormControl('Pa654word234!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Two;
    options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Two;
    const control = new FormControl('Pa56word321!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Two;
    options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Three;
    const control = new FormControl('Pa7654word12!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Two;
    options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Two;
    const control = new FormControl('Password123765!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
  it('Invalid password', () => {
    options.maximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Two;
    options.maximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Two;
    const control = new FormControl('Password123654!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
});

describe('Min No Of Lower Case', () => {
  let options = new MyPasswordStrengthOptions();

  options.requireDigit = false;
  options.requireSpecialCharacter = false;
  options.requireMaxNoOfSameConsecutiveCharacters = false;
  options.requireUppercase = false;
  options.requireLowercase = true;
  options.minimumLowercase = 5;

  const validatorFn = passwordStrengthValidator(options);  

  it('Valid password', () => {
    const control = new FormControl('Password1!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Invalid password', () => {
    const control = new FormControl('PassWORD1!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
});

describe('Min No Of Upper Case', () => {
  let options = new MyPasswordStrengthOptions();

  options.requireDigit = false;
  options.requireSpecialCharacter = false;
  options.requireMaxNoOfSameConsecutiveCharacters = false;
  options.requireLowercase = false;
  options.requireUppercase = true;
  options.minimumUppercase = 5;

  const validatorFn = passwordStrengthValidator(options);  

  it('Valid password', () => {
    const control = new FormControl('PaSSwOrD1!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Invalid password', () => {
    const control = new FormControl('PaSSwoRd1!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
});

describe('Min No Of Digits', () => {
  let options = new MyPasswordStrengthOptions();
  
  options.requireSpecialCharacter = false;
  options.requireMaxNoOfSameConsecutiveCharacters = false;
  options.requireLowercase = false;
  options.requireUppercase = false;
  options.requireDigit = true;
  options.minimumDigit = 2;

  const validatorFn = passwordStrengthValidator(options);  

  it('Valid password', () => {
    const control = new FormControl('Passw0rD1!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Invalid password', () => {
    const control = new FormControl('PaSSwoRd1!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
});

describe('Min No Of Special Characters', () => {
  let options = new MyPasswordStrengthOptions();
    
  options.requireMaxNoOfSameConsecutiveCharacters = false;
  options.requireLowercase = false;
  options.requireUppercase = false;
  options.requireDigit = false;
  options.requireSpecialCharacter = true;
  options.minimumSpecialCharacter = 2;

  const validatorFn = passwordStrengthValidator(options);  

  it('Valid password', () => {
    const control = new FormControl('P@ssworD1!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
  it('Invalid password', () => {
    const control = new FormControl('PaSSwoRd1!');
    const result = validatorFn(control);
    expect(result).not.toBeNull();
  });
});

describe('All Together', () => {
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

  const validatorFn = passwordStrengthValidator(options);  

  it('Valid password', () => {
    const control = new FormControl('P@76w0rDe123!');
    const result = validatorFn(control);
    expect(result).toBeNull();
  });
});