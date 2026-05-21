# ASP .NET Core Password Strength Data Annotation

You can use the provided properties to configure it to your needs.

```csharp
using System.ComponentModel.DataAnnotations;

namespace Your.Namespace
{
    public class PasswordStrengthAttribute : RegularExpressionAttribute
    {
        public PasswordStrengthAttribute(int minimumLength = 6, bool requireUppercase = true, int minUpper = 1, 
                                            bool requireLowercase = true, int minLower = 1, bool requireDigit = true, int minDigit = 1, bool requireSpecialCharacter = true, int minSpecialCharacter = 1,
                                            bool requireMaxNoOfSameConsecutiveCharacters = true, int maxNoOfSameConsecutiveCharacters = 2)
            : base(GetRegexPattern(minimumLength, requireUppercase, minUpper, requireLowercase, minLower, requireDigit, minDigit, requireSpecialCharacter, minSpecialCharacter, requireMaxNoOfSameConsecutiveCharacters, maxNoOfSameConsecutiveCharacters))
        {
        }

        private static string GetRegexPattern(int minLength, bool upper, int minUpper, bool lower, int minLower, bool digit, int minDigit, bool special, int minSpecialCharacter, bool requireMaxNoOfSameConsecutiveCharacters, int maxNoOfSameConsecutiveCharacters)
        {
            string pattern = "^";
            if (upper)
                pattern += "(?=(.*?[A-Z]){" + minUpper + ",})"; // min no of uppercase letter
            if (lower)
                pattern += "(?=(.*?[a-z]){" + minLower + ",})"; // min no of lowercase letter
            if (digit)
                pattern += "(?=(.*?\\d){" + minDigit + ",})"; // min no of digit
            if (special)
                pattern += "(?=(.*?[@$!%*?&]){" + minSpecialCharacter + ",})"; // min no of special character
            if (requireMaxNoOfSameConsecutiveCharacters)
                pattern += "(?=^((?<currentChar>.)(?!\\k<currentChar>{" + maxNoOfSameConsecutiveCharacters + "}))+$)"; //max no of same consecutive characters
            pattern += $".{{{minLength},}}$"; // Minimum length
            return pattern;
        }
        
    }
}
```

## Sample Usage
```csharp
[PasswordStrength(minimumLength: 8, ErrorMessage = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).")]
public string? Password { get; set; }
```