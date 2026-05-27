import { FormControl } from '@angular/forms';
import { MyPasswordStrengthOptions, passwordStrengthValidator } from './angular-my-password-strength.component';

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