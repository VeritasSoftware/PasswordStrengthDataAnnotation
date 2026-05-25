# MyPasswordStrength

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
var passwordStrengthValidator = new PasswordStrengthValidator
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
bool isValid =  passwordStrengthValidator.PasswordStrength(password);

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