# ASP .NET Core Password Strength Data Annotation

You can use the provided properties to configure it to your needs.

```csharp
using System.ComponentModel.DataAnnotations;

namespace Your.Namespace
{
    public class PasswordStrengthAttribute : RegularExpressionAttribute
    {
        public int MinimumLength { get; set; } = 6;
        public bool RequireUppercase { get; set; } = true;
        public int MinNumberOfUppercase { get; set; } = 1;
        public bool RequireLowercase { get; set; } = true;
        public int MinNumberOfLowercase { get; set; } = 1;
        public bool RequireDigit { get; set; } = true;
        public int MinNumberOfDigit { get; set; } = 1;
        public bool RequireSpecialCharacter { get; set; } = true; // any of @$!%*?&
        public int MinNumberOfSpecialCharacter { get; set; } = 1;

        public PasswordStrengthAttribute(int minimumLength = 6, bool requireUppercase = true, int minUpper = 1, 
                                            bool requireLowercase = true, int minLower = 1, bool requireDigit = true, int minDigit = 1, bool requireSpecialCharacter = true, int minSpecialCharacter = 1)
            : base(GetRegexPattern(minimumLength, requireUppercase, minUpper, requireLowercase, minLower, requireDigit, minDigit, requireSpecialCharacter, minSpecialCharacter))
        {
            MinimumLength = minimumLength;
            RequireUppercase = requireUppercase;
            RequireLowercase = requireLowercase;
            RequireDigit = requireDigit;
            RequireSpecialCharacter = requireSpecialCharacter;
        }

        private static string GetRegexPattern(int minLength, bool upper, int minUpper, bool lower, int minLower, bool digit, int minDigit, bool special, int minSpecialCharacter)
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
            pattern += $".{{{minLength},}}$"; // Minimum length
            return pattern;
        }
        
    }
}
```

## Sample Usage
```csharp
[PasswordStrength(MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).")]
public string? Password { get; set; }
```