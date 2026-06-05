# MyPasswordStrength

[![.NET Build & Test](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/dotnet.yml/badge.svg)](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/dotnet.yml)
[![TypeScript Build & Test](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/node.js.yml/badge.svg)](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/node.js.yml)
[![Angular Build & Test](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/angular.node.js.yml/badge.svg)](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/angular.node.js.yml)
[![ReactJS Build & Test](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/react.node.js.yml/badge.svg)](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/actions/workflows/react.node.js.yml)

|**Packages**|Version|Downloads|
|---------------------------|:---:|:---:|
|*MyPasswordStrength*|[![Nuget Version](https://img.shields.io/nuget/v/MyPasswordStrength)](https://www.nuget.org/packages/MyPasswordStrength)|[![Downloads count](https://img.shields.io/nuget/dt/MyPasswordStrength)](https://www.nuget.org/packages/MyPasswordStrength)|
|*ts-my-password-strength*|[![NPM Version](https://img.shields.io/npm/v/ts-my-password-strength)](https://www.npmjs.com/package/ts-my-password-strength)|[![Downloads count](https://img.shields.io/npm/dy/ts-my-password-strength)](https://www.npmjs.com/package/ts-my-password-strength)|
|*angular-my-password-strength*|[![NPM Version](https://img.shields.io/npm/v/angular-my-password-strength)](https://www.npmjs.com/package/angular-my-password-strength)|[![Downloads count](https://img.shields.io/npm/dy/angular-my-password-strength)](https://www.npmjs.com/package/angular-my-password-strength)|

[**Typescript Library**](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/tree/master/ts-my-password-strength)   [**Angular Library**](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/tree/master/angular-my-password-strength)   [**ReactJS Library**](https://github.com/VeritasSoftware/PasswordStrengthDataAnnotation/tree/master/react-my-password-strength)

Define your password strength complexity requirements with ease using the library. 

The package provides a Validator class that you can use to validate passwords programmatically.

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
    MinimumLength = 8,
    RequireUppercase = true,
    MinUppercase = 2,
    RequireLowercase = true,
    MinLowercase = 3,
    RequireDigit = true,
    MinDigit = 2,
    RequireSpecialCharacter = true,
    MinSpecialCharacter = 2,
    RequireMaxNoOfSameConsecutiveCharacters = true,
    MaxNoOfSameConsecutiveCharacters = 2
};

var password = "P@Ssw0rd1!";

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

The special characters considered in the validation are: @$!%*?&. 

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
                                            bool requireSpecialCharacter = true, int minSpecialCharacter = 1, string specialCharacters = @"@$!%*?&",
                                            bool requireMaxNoOfSameConsecutiveCharacters = true, int maxNoOfSameConsecutiveCharacters = 2)
            : base(PasswordStrengthValidator.GetRegexPattern(minimumLength, requireUppercase, minUppercase, requireLowercase, minLowercase, 
                                                                requireDigit, minDigit, requireSpecialCharacter, minSpecialCharacter, specialCharacters, 
                                                                requireMaxNoOfSameConsecutiveCharacters, maxNoOfSameConsecutiveCharacters))
        {
        }               
    }
}
```

### Sample Usage

```csharp
[PasswordStrength(minimumLength: 8,
				  minUppercase: 2,
				  minLowercase: 3,
				  minDigit: 2,
				  minSpecialCharacter: 2,
				  maxNoOfSameConsecutiveCharacters: 2,
				  ErrorMessage = "Password must be at least 8 characters long and contain at least two uppercase letters, three lowercase letters, two numbers, and two special characters (@$!%*?&), with a maximum of 2 same consecutive characters.")]
public string? Password { get; set; }
```