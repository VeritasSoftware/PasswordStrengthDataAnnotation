using System.Text.RegularExpressions;

namespace MyPasswordStrength
{
    public class PasswordStrengthValidator
    {
        public int MinimumLength { get; set; }
        public bool RequireUppercase { get; set; } = true;
        public int MinUppercase { get; set; } = 1;
        public bool RequireLowercase { get; set; } = true;
        public int MinLowercase { get; set; } = 1;
        public bool RequireDigit { get; set; } = true;
        public int MinDigit { get; set; } = 1;
        public bool RequireSpecialCharacter { get; set; } = true;
        public int MinSpecialCharacter { get; set; } = 1;
        public string SpecialCharacters { get; set; } = @"@$!%*?&";
        public bool RequireMaxNoOfSameConsecutiveCharacters { get; set; } = true;
        public int MaxNoOfSameConsecutiveCharacters { get; set; } = 2;
        public static string GetRegexPattern(int minLength, bool upper, int minUpper, bool lower, int minLower, 
                                                bool digit, int minDigit, bool special, int minSpecialCharacter, string specialCharacters, 
                                                bool requireMaxNoOfSameConsecutiveCharacters, int maxNoOfSameConsecutiveCharacters)
        {
            string pattern = "^";
            if (upper)
                pattern += "(?=(.*?[A-Z]){" + minUpper + ",})"; // min no of uppercase letter
            if (lower)
                pattern += "(?=(.*?[a-z]){" + minLower + ",})"; // min no of lowercase letter
            if (digit)
                pattern += "(?=(.*?\\d){" + minDigit + ",})"; // min no of digit
            if (special)
                pattern += "(?=(.*?[" + specialCharacters + "]){" + minSpecialCharacter + ",})"; // min no of special character
            if (requireMaxNoOfSameConsecutiveCharacters)
                pattern += "(?=^((?<currentChar>.)(?!\\k<currentChar>{" + maxNoOfSameConsecutiveCharacters + "}))+$)"; //max no of same consecutive characters
            pattern += $".{{{minLength},}}$"; // Minimum length
            return pattern;
        }

        public bool PasswordStrength(string password)
        {
            if (string.IsNullOrEmpty(password))
                return false;

            var regexPattern = GetRegexPattern(MinimumLength, RequireUppercase, MinUppercase, RequireLowercase, MinLowercase, 
                                                RequireDigit, MinDigit, RequireSpecialCharacter, MinSpecialCharacter, SpecialCharacters,
                                                RequireMaxNoOfSameConsecutiveCharacters, MaxNoOfSameConsecutiveCharacters);

            return Regex.IsMatch(password, regexPattern);
        }
    }  
}
