# MyPasswordStrength

[![.NET Build & Test](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/dotnet.yml/badge.svg)](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/dotnet.yml)
[![TypeScript Build & Test](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/node.js.yml/badge.svg)](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/node.js.yml)
[![Angular Build & Test](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/angular.node.js.yml/badge.svg)](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/angular.node.js.yml)
[![ReactJS Build & Test](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/react.node.js.yml/badge.svg)](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/react.node.js.yml)

|**Packages**|Version|Downloads|
|---------------------------|:---:|:---:|
|*MyPasswordStrength*|[![Nuget Version](https://img.shields.io/nuget/v/MyPasswordStrength)](https://www.nuget.org/packages/MyPasswordStrength)|[![Downloads count](https://img.shields.io/nuget/dt/MyPasswordStrength)](https://www.nuget.org/packages/MyPasswordStrength)|
|*MyPasswordStrength.NET.MAUI*|[![Nuget Version](https://img.shields.io/nuget/v/MyPasswordStrength.NET.MAUI)](https://www.nuget.org/packages/MyPasswordStrength.NET.MAUI)|[![Downloads count](https://img.shields.io/nuget/dt/MyPasswordStrength.NET.MAUI)](https://www.nuget.org/packages/MyPasswordStrength.NET.MAUI)|
|*ts-my-password-strength*|[![NPM Version](https://img.shields.io/npm/v/ts-my-password-strength)](https://www.npmjs.com/package/ts-my-password-strength)|[![Downloads count](https://img.shields.io/npm/dy/ts-my-password-strength)](https://www.npmjs.com/package/ts-my-password-strength)|
|*angular-my-password-strength*|[![NPM Version](https://img.shields.io/npm/v/angular-my-password-strength)](https://www.npmjs.com/package/angular-my-password-strength)|[![Downloads count](https://img.shields.io/npm/dy/angular-my-password-strength)](https://www.npmjs.com/package/angular-my-password-strength)|
|*react-my-password-strength*|[![NPM Version](https://img.shields.io/npm/v/react-my-password-strength)](https://www.npmjs.com/package/react-my-password-strength)|[![Downloads count](https://img.shields.io/npm/dy/react-my-password-strength)](https://www.npmjs.com/package/react-my-password-strength)|

[**Typescript Library**](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/tree/master/ts-my-password-strength)   [**Angular Library**](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/tree/master/angular-my-password-strength)   [**ReactJS Library**](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/tree/master/react-my-password-strength)   [**.NET MAUI Library**](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/tree/master/MyPasswordStrength.NET.MAUI)

Define your password strength complexity requirements with ease using the library. 

The package provides a Validator class that you can use to validate passwords programmatically.

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

## Programmatic Password Validation

You can validate passwords programmatically using the `PasswordStrengthValidator` class provided in the package.

You can set the password strength requirements through the properties of the `PasswordStrengthValidator` class, 

and then call the `PasswordStrength` method to check if a given password meets those requirements.

The `PasswordStrength` method returns a boolean indicating whether the password is valid according to the configured requirements.

### Sample Usage

```csharp
// Configure password strength requirements
var validator = new PasswordStrengthValidator
{
    MinimumLength = 9,
    RequireUppercase = true,
    MinUppercase = 2,
    RequireLowercase = true,
    MinLowercase = 3,
    RequireDigit = true,
    MinDigit = 2,
    RequireSpecialCharacter = true,
    MinSpecialCharacter = 2,
    RequireMaxNoOfSameConsecutiveCharacters = true,
    MaxNoOfSameConsecutiveCharacters = 2,
    RequireMaxNoOfConsecutiveAscendingDigits = true,
    MaxNoOfConsecutiveAscendingDigits = MaxNoOfConsecutiveDigits.Three,
    RequireMaxNoOfConsecutiveDescendingDigits = true,
    MaxNoOfConsecutiveDescendingDigits = MaxNoOfConsecutiveDigits.Two,
    RequireMaxNoOfConsecutiveAscendingCharacters = true,
    MaxNoOfConsecutiveAscendingCharacters = MaxNoOfConsecutiveCharacters.Three,
    RequireMaxNoOfConsecutiveDescendingCharacters = true,
    MaxNoOfConsecutiveDescendingCharacters = MaxNoOfConsecutiveCharacters.Two,
    RequireRepeatingSequenceCheck = true,
    MinLengthOfRepeatingSequence = 2
};

var password = "P@76w0rDe123!";

// Validate the password
bool isValid =  validator.PasswordStrength(password);

if (isValid)
{
	Console.WriteLine("Password meets the strength requirements.");
}
else
{
	Console.WriteLine("Password does not meet the strength requirements.");
}
```

The special characters considered in the validation are: !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~. 

You can modify this set of special characters by setting the `SpecialCharacters` property to a custom string of special characters.

## Sample ASP .NET Core Password Strength Data Annotation

You can use the Validator class to create a custom data annotation attribute for password strength validation in your ASP .NET Core applications.

### Sample data annotation

```csharp
using MyPasswordStrength;
using System.ComponentModel.DataAnnotations;

namespace YourNamespace
{
    public class PasswordStrengthAttribute : RegularExpressionAttribute
    {        
        public PasswordStrengthAttribute(int minimumLength = 6, bool requireUppercase = true, int minUppercase = 1,
                                            bool requireLowercase = true, int minLowercase = 1, bool requireDigit = true, int minDigit = 1,
                                            bool requireSpecialCharacter = true, int minSpecialCharacter = 1, string specialCharacters = @"!""#$%&'()*+,-./:;<=>?@[\]^_`{|}~",
                                            bool requireMaxNoOfSameConsecutiveCharacters = true, int maxNoOfSameConsecutiveCharacters = 2,
                                            bool requireMaxNoOfConsecutiveAscendingDigits = true, MaxNoOfConsecutiveDigits maxNoOfConsecutiveAscendingDigits = MaxNoOfConsecutiveDigits.Two,
                                            bool requireMaxNoOfConsecutiveDescendingDigits = true, MaxNoOfConsecutiveDigits maxNoOfConsecutiveDescendingDigits = MaxNoOfConsecutiveDigits.Two,
                                            bool requireMaxNoOfConsecutiveAscendingCharacters = true, MaxNoOfConsecutiveCharacters maxNoOfConsecutiveAscendingCharacters = MaxNoOfConsecutiveCharacters.Two,
                                            bool requireMaxNoOfConsecutiveDescendingCharacters = true, MaxNoOfConsecutiveCharacters maxNoOfConsecutiveDescendingCharacters = MaxNoOfConsecutiveCharacters.Two,
                                            bool requireRepeatingSequenceCheck = true, int minLengthOfRepeatingSequence = 2)
            : base(PasswordStrengthValidator.GetRegexPattern(minimumLength, requireUppercase, minUppercase, requireLowercase, minLowercase,
                                                                requireDigit, minDigit, requireSpecialCharacter, minSpecialCharacter, specialCharacters,
                                                                requireMaxNoOfSameConsecutiveCharacters, maxNoOfSameConsecutiveCharacters,
                                                                requireMaxNoOfConsecutiveAscendingDigits, maxNoOfConsecutiveAscendingDigits,
                                                                requireMaxNoOfConsecutiveDescendingDigits, maxNoOfConsecutiveDescendingDigits,
                                                                requireMaxNoOfConsecutiveAscendingCharacters, maxNoOfConsecutiveAscendingCharacters,
                                                                requireMaxNoOfConsecutiveDescendingCharacters, maxNoOfConsecutiveDescendingCharacters,
                                                                requireRepeatingSequenceCheck, minLengthOfRepeatingSequence))
        {
        }
    }
}
```

### Sample Usage

```csharp
[PasswordStrength(minimumLength: 9,
                    minUppercase: 2,
                    minLowercase: 3,
                    minDigit: 2,
                    minSpecialCharacter: 2,
                    maxNoOfSameConsecutiveCharacters: 2,
                    maxNoOfConsecutiveAscendingDigits: MaxNoOfConsecutiveDigits.Three,
                    maxNoOfConsecutiveDescendingDigits: MaxNoOfConsecutiveDigits.Three,
                    maxNoOfConsecutiveAscendingCharacters: MaxNoOfConsecutiveCharacters.Three,
                    maxNoOfConsecutiveDescendingCharacters: MaxNoOfConsecutiveCharacters.Two,
                    minLengthOfRepeatingSequence: 2,
                    ErrorMessage = "Password must be at least 9 chars, 2 uppercase, 3 lowercase, 2 digit, 2 special char, no more than 2 same consecutive chars, no more than 3 consecutive ascending digits, no more than 3 consecutive descending digits, no more than 3 consecutive ascending characters, no more than 2 consecutive descending characters, no repeating sequence of more than 2 chars.")]
public string? Password { get; set; }
```