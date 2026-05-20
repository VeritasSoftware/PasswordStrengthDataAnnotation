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
        public bool RequireMaxNoOfSameConsecutiveCharacters { get; set; } = true;
        public int MaxNoOfSameConsecutiveCharacters { get; set; } = 2;

        public PasswordStrengthAttribute(int minimumLength = 6, bool requireUppercase = true, int minUpper = 1, 
                                            bool requireLowercase = true, int minLower = 1, bool requireDigit = true, int minDigit = 1, bool requireSpecialCharacter = true, int minSpecialCharacter = 1,
                                            bool requireMaxNoOfSameConsecutiveCharacters = true, int maxNoOfSameConsecutiveCharacters = 2)
            : base(GetRegexPattern(minimumLength, requireUppercase, minUpper, requireLowercase, minLower, requireDigit, minDigit, requireSpecialCharacter, minSpecialCharacter, requireMaxNoOfSameConsecutiveCharacters, maxNoOfSameConsecutiveCharacters))
        {
            MinimumLength = minimumLength;
            RequireUppercase = requireUppercase;
            RequireLowercase = requireLowercase;
            RequireDigit = requireDigit;
            RequireSpecialCharacter = requireSpecialCharacter;
            RequireMaxNoOfSameConsecutiveCharacters = requireMaxNoOfSameConsecutiveCharacters;
            MinNumberOfUppercase = minUpper;
            MinNumberOfLowercase = minLower;
            MinNumberOfDigit = minDigit;
            MinNumberOfSpecialCharacter = minSpecialCharacter;            
            MaxNoOfSameConsecutiveCharacters = maxNoOfSameConsecutiveCharacters;
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
