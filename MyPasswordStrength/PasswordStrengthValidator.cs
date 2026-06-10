using System;
using System.Collections.Generic;
using System.Linq;
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
        public bool RequireMaxNoOfConsecutiveAscendingDigits { get; set; } = true;
        public MaxNoOfConsecutiveDigits MaxNoOfConsecutiveAscendingDigits { get; set; } = MaxNoOfConsecutiveDigits.Two;
        public bool RequireMaxNoOfConsecutiveDescendingDigits { get; set; } = true;
        public MaxNoOfConsecutiveDigits MaxNoOfConsecutiveDescendingDigits { get; set; } = MaxNoOfConsecutiveDigits.Two;
        public bool RequireMaxNoOfConsecutiveAscendingCharacters { get; set; } = true;
        public MaxNoOfConsecutiveCharacters MaxNoOfConsecutiveAscendingCharacters { get; set; } = MaxNoOfConsecutiveCharacters.Two;
        public bool RequireMaxNoOfConsecutiveDescendingCharacters { get; set; } = true;
        public MaxNoOfConsecutiveCharacters MaxNoOfConsecutiveDescendingCharacters { get; set; } = MaxNoOfConsecutiveCharacters.Two;
        public static string GetRegexPattern(int minLength, bool upper, int minUpper, bool lower, int minLower,
                                                bool digit, int minDigit, bool special, int minSpecialCharacter, string specialCharacters,
                                                bool requireMaxNoOfSameConsecutiveCharacters, int maxNoOfSameConsecutiveCharacters,
                                                bool requireMaxNoOfConsecutiveAscendingDigits, MaxNoOfConsecutiveDigits maxNoOfConsecutiveAscendingDigits,
                                                bool requireMaxNoOfConsecutiveDescendingDigits, MaxNoOfConsecutiveDigits maxNoOfConsecutiveDescendingDigits,
                                                bool requireMaxNoOfConsecutiveAscendingCharacters, MaxNoOfConsecutiveCharacters maxNoOfConsecutiveAscendingCharacters,
                                                bool requireMaxNoOfConsecutiveDescendingCharacters, MaxNoOfConsecutiveCharacters maxNoOfConsecutiveDescendingCharacters)
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
            if (requireMaxNoOfConsecutiveAscendingDigits)
                pattern += "(?!^(.*?(" + GetMaxConsecutiveDigitsPattern((int)maxNoOfConsecutiveAscendingDigits + 1) + "))+)"; // Max no of consecutive ascending digits
            if (requireMaxNoOfConsecutiveDescendingDigits)
                pattern += "(?!^(.*?(" + GetMaxConsecutiveDigitsPattern((int)maxNoOfConsecutiveDescendingDigits + 1, true) + "))+)"; // Max no of consecutive descending digits
            if (requireMaxNoOfConsecutiveAscendingCharacters)
                pattern += "(?!^(.*?(" + GetMaxConsecutiveCharactersPattern((int)maxNoOfConsecutiveAscendingCharacters + 1) + "))+)"; // Max no of consecutive ascending digits
            if (requireMaxNoOfConsecutiveDescendingCharacters)
                pattern += "(?!^(.*?(" + GetMaxConsecutiveCharactersPattern((int)maxNoOfConsecutiveDescendingCharacters + 1, true) + "))+)"; // Max no of consecutive descending digits
            pattern += $".{{{minLength},}}$"; // Minimum length
            return pattern;
        }

        public bool PasswordStrength(string password)
        {
            if (string.IsNullOrEmpty(password))
                return false;

            var regexPattern = GetRegexPattern(MinimumLength, RequireUppercase, MinUppercase, RequireLowercase, MinLowercase,
                                                RequireDigit, MinDigit, RequireSpecialCharacter, MinSpecialCharacter, SpecialCharacters,
                                                RequireMaxNoOfSameConsecutiveCharacters, MaxNoOfSameConsecutiveCharacters,
                                                RequireMaxNoOfConsecutiveAscendingDigits, MaxNoOfConsecutiveAscendingDigits,
                                                RequireMaxNoOfConsecutiveDescendingDigits, MaxNoOfConsecutiveDescendingDigits,
                                                RequireMaxNoOfConsecutiveAscendingCharacters, MaxNoOfConsecutiveAscendingCharacters,
                                                RequireMaxNoOfConsecutiveDescendingCharacters, MaxNoOfConsecutiveDescendingCharacters);

            return Regex.IsMatch(password, regexPattern);
        }

        private static string GetMaxConsecutiveDigitsPattern(int length, bool isDescending = false)
        {
            var sequences = Enumerable.Range(0, 9).If(isDescending, list => list.Reverse())
                                        .Select(st => string.Concat(
                                            Enumerable.Range(st, length).If(isDescending, list => list.Reverse()) // consecutive digits
                                        ));

            var result = string.Join("|", sequences);

            return result;
        }

        private static string GetMaxConsecutiveCharactersPattern(int length, bool isDescending = false)
        {
            if (length <= 0) return string.Empty;

            var sequences = Enumerable.Range('A', 26).If(isDescending, list => list.Reverse())
                                        .Select(st => {
                                            var upperRange = Enumerable.Range(st, length)
                                                                        .If(isDescending, list => list.Reverse())
                                                                        .Select(x => $"{(char)x}");

                                            var lowerRange = upperRange.Select(c => $"{c.ToLower()}");
                                            var upperLowerRange = upperRange.Select(c => $"({c}|{c.ToLower()})");
                                            var lowerUpperRange = upperRange.Select(c => $"({c.ToLower()}|{c})");

                                            var upper = string.Concat(upperRange);
                                            var lower = string.Concat(lowerRange);
                                            var upperLower = string.Concat(upperLowerRange);
                                            var lowerUpper = string.Concat(lowerUpperRange);

                                            var values = new
                                            {
                                                Upper = upper,
                                                Lower = lower,
                                                UpperLower = upperLower,
                                                LowerUpper = lowerUpper
                                            };

                                            return values;
                                        })
                                        .Select(x => string.Join("|", x.Upper, x.Lower, x.UpperLower, x.LowerUpper));
            
            var validSequences = isDescending ? sequences.Skip(length).Take(sequences.Count() - length) 
                                              : sequences.Take(sequences.Count() - length);

            var result = string.Join("|", validSequences);

            return result;
        }
    }

    public enum MaxNoOfConsecutiveDigits
    {
        Two = 2,
        Three = 3,
        Four = 4,
        Five = 5
    }

    public enum MaxNoOfConsecutiveCharacters
    {
        Two = 2,
        Three = 3,
        Four = 4,
        Five = 5
    }

    internal static class Extensions
    {
        public static IEnumerable<T> If<T> (this IEnumerable<T> list, bool condition, 
                                                Func<IEnumerable<T>, IEnumerable<T>> then)
        {
            if (condition)
            {
                list = then(list);
            }
            return list;
        }
    }
}
