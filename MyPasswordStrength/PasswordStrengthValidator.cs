using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;

namespace MyPasswordStrength
{
    public class PasswordStrengthValidator
    {
        private const string _englishUppercase = "A-Z";
        private const string _englishLowercase = "a-z";
        private const string _bengali = @"\\u0980-\\u09FF";
        private const string _hindi = @"\\u0900-\\u097F";
        private const string _chinese = @"\\u4E00-\\u9FFF";
        private const string _korean = @"\\u1100-\\u11FF\\u3130-\\u318F\\uAC00-\\uD7A3\\uA960-\\uA97F\\uD7B0-\\uD7FF";
        private const string _japanese = @"\\u3040-\\u309F\\u30A0-\\u30FF\\u4E00-\\u9FFF";
        private const string _urdu = @"\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF";

        public int MinimumLength { get; set; }
        public bool RequireUppercase { get; set; } = true;
        public int MinUppercase { get; set; } = 1;
        public bool RequireLowercase { get; set; } = true;
        public int MinLowercase { get; set; } = 1;
        public bool RequireDigit { get; set; } = true;
        public int MinDigit { get; set; } = 1;
        public bool RequireSpecialCharacter { get; set; } = true;
        public int MinSpecialCharacter { get; set; } = 1;
        public string SpecialCharacters { get; set; } = @"!""#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
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
        public bool RequireRepeatingSequenceCheck { get; set; } = true;
        public int MinLengthOfRepeatingSequence { get; set; } = 2;
        public Language Language { get; set; } = Language.English;

        public static string GetRegexPattern(int minLength, bool upper, int minUpper, bool lower, int minLower,
                                                bool digit, int minDigit, bool special, int minSpecialCharacter, string specialCharacters,
                                                bool requireMaxNoOfSameConsecutiveCharacters, int maxNoOfSameConsecutiveCharacters,
                                                bool requireMaxNoOfConsecutiveAscendingDigits, MaxNoOfConsecutiveDigits maxNoOfConsecutiveAscendingDigits,
                                                bool requireMaxNoOfConsecutiveDescendingDigits, MaxNoOfConsecutiveDigits maxNoOfConsecutiveDescendingDigits,
                                                bool requireMaxNoOfConsecutiveAscendingCharacters, MaxNoOfConsecutiveCharacters maxNoOfConsecutiveAscendingCharacters,
                                                bool requireMaxNoOfConsecutiveDescendingCharacters, MaxNoOfConsecutiveCharacters maxNoOfConsecutiveDescendingCharacters,
                                                bool requireRepeatingSequenceCheck, int minLengthOfRepeatingSequence,
                                                Language language)
        {
            string pattern = "^";
            if (upper)
                pattern +=  ReplaceLanguage(language, "(?=(.*?[A-Z]){") + minUpper + ",})"; // min no of uppercase letter
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
                pattern += "(?!^(.*?(" + GetMaxConsecutiveCharactersPattern((int)maxNoOfConsecutiveAscendingCharacters + 1, language) + "))+)"; // Max no of consecutive ascending digits
            if (requireMaxNoOfConsecutiveDescendingCharacters)
                pattern += "(?!^(.*?(" + GetMaxConsecutiveCharactersPattern((int)maxNoOfConsecutiveDescendingCharacters + 1, language, true) + "))+)"; // Max no of consecutive descending digits
            if (requireRepeatingSequenceCheck)
                pattern += "(?!^(.*?(?<repeating>.{" + minLengthOfRepeatingSequence + ",})(?=(.*?\\k<repeating>)))+)"; // Repeating sequence
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
                                                RequireMaxNoOfConsecutiveDescendingCharacters, MaxNoOfConsecutiveDescendingCharacters,
                                                RequireRepeatingSequenceCheck, MinLengthOfRepeatingSequence, Language);

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

        private static string ReplaceLanguage(Language language, string theString)
        {
            switch (language)
            {
                case Language.Bangla: return theString.Replace("A-Z", _bengali);
                case Language.Hindi: return theString.Replace("A-Z", _hindi);
                case Language.Chinese: return theString.Replace("A-Z", _chinese);
                case Language.Korean: return theString.Replace("A-Z", _korean);
                case Language.Japanese: return theString.Replace("A-Z", _japanese);
                case Language.Urdu: return theString.Replace("A-Z", _urdu);
                default: return theString;
            }
        }

        static int ConvertUnicodeToHexNumber(string input)
        {
            return int.Parse(input, NumberStyles.HexNumber, CultureInfo.InvariantCulture);
        }

        static List<int> GetUTF16Range(int startCodePoint, int endCodePoint)
        {
            var rangeList = new List<int>();

            for (int cp = startCodePoint; cp <= endCodePoint; cp++)
            {
                rangeList.Add(cp);
            }

            return rangeList;
        }


        public static List<(string, string)> GetStartEndList(string language)
        {
            var result = new List<(string, string)>();
            var startChars = new List<string>();
            var endChars = new List<string>();

            var pattern = @"^(\\\\u(?<start>[0-9A-Fa-f]{4})-\\\\u(?<end>[0-9A-Fa-f]{4}))+$";

            var m = Regex.Match(language, pattern, RegexOptions.Compiled);

            foreach (Capture c in m.Groups["start"].Captures)
            {
                startChars.Add(c.Value);
            }
            foreach (Capture c in m.Groups["end"].Captures)
            {
                endChars.Add(c.Value);
            }

            var length = endChars.Count;

            for (int i = 0; i < length; i++)
            {
                result.Add((startChars[i], endChars[i]));
            }

            return result;
        }

        private static List<(string, string)> GetStartEnd(Language language)
        {            
            switch(language)
            {
                case Language.Bangla:
                    return GetStartEndList(_bengali);
                case Language.Hindi:
                    return GetStartEndList(_hindi);
                case Language.Chinese:
                    return GetStartEndList(_chinese);
                case Language.Korean:
                    return GetStartEndList(_korean);
                case Language.Japanese:
                    return GetStartEndList(_japanese);
                case Language.Urdu:
                    return GetStartEndList(_urdu);
                default:
                    return new List<(string, string)>() { ("A", "Z") };
            };
        }

        private static string GetMaxConsecutiveCharactersPattern(int length, Language language = Language.English, bool isDescending = false)
        {
            if (length <= 0) return string.Empty;

            List<(string, string)> startEndCharsList = new List<(string, string)>();
            IEnumerable<int> range = new List<int>();
            
            if (language != Language.English)
            {
                switch (language)
                {
                    case Language.Bangla:
                        startEndCharsList = GetStartEnd(Language.Bangla);
                        break;
                    case Language.Hindi:
                        startEndCharsList = GetStartEnd(Language.Hindi);
                        break;
                    case Language.Chinese:
                        startEndCharsList = GetStartEnd(Language.Chinese);
                        break;
                    case Language.Korean:
                        startEndCharsList = GetStartEnd(Language.Korean);
                        break;
                    case Language.Japanese:
                        startEndCharsList = GetStartEnd(Language.Japanese);
                        break;
                    case Language.Urdu:
                        startEndCharsList = GetStartEnd(Language.Urdu);
                        break;
                }

                range = startEndCharsList.Select(x => new
                {
                    Start = ConvertUnicodeToHexNumber(x.Item1),
                    End = ConvertUnicodeToHexNumber(x.Item2)
                }).SelectMany(x => GetUTF16Range(x.Start, x.End));
            }
            

            var sequences = new List<string>();

            if (language == Language.English)
            {
                sequences = Enumerable.Range('A', 26).If(isDescending, list => list.Reverse())
                                        .Select(st => {
                                            var upperRange = Enumerable.Range(st, length)
                                                                        .If(isDescending, list => list.Reverse())
                                                                        .Select(x => $"{(char)x}");

                                            var upperLowerRange = upperRange.Select(c => $"({c}|{c.ToLower()})");
                                            var lowerUpperRange = upperRange.Select(c => $"({c.ToLower()}|{c})");

                                            var upperLower = string.Concat(upperLowerRange);
                                            var lowerUpper = string.Concat(lowerUpperRange);

                                            var values = new
                                            {
                                                UpperLower = upperLower,
                                                LowerUpper = lowerUpper
                                            };

                                            return values;
                                        })
                                        .Select(x => string.Join("|", x.UpperLower, x.LowerUpper))
                                        .ToList();
            }
            else
            {
                sequences = range.If(isDescending, list => list.Reverse())
                                        .Select(st =>
                                        {
                                            var charRange = Enumerable.Range(st, length)
                                                                        .If(isDescending, list => list.Reverse())
                                                                        .Select(x => $"{(char)x}");

                                            var values = new
                                            {
                                                Value = string.Concat(charRange),
                                            };

                                            return values;
                                        })
                                        .Select(x => string.Join("|", x.Value))
                                        .ToList();
            }
            
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

    public enum Language
    {
        English = 0,
        Bangla = 1,
        Hindi = 2,
        Chinese = 3,
        Korean = 4,
        Japanese = 5,
        Urdu = 6
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