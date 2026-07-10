using MyPasswordStrength.NET.MAUI.Validator;
using System.ComponentModel.DataAnnotations;

namespace MyPasswordStrength.NET.MAUI
{
    public class PasswordStrengthAttribute : RegularExpressionAttribute
    {
        public PasswordStrengthAttribute(int minimumLength = 6, bool requireUppercase = true, int minUppercase = 1,
                                            bool requireLowercase = true, int minLowercase = 1, bool requireDigit = true, int minDigit = 1,
                                            bool requireSpecialCharacter = true, int minSpecialCharacter = 1, string specialCharacters = @"!""#$%&'()*+,-./:;<=>?@[\]^_`{|}~",
                                            bool requireMaxNoOfSameConsecutiveCharacters = true, int maxNoOfSameConsecutiveCharacters = 2,
                                            bool requireMaxNoOfConsecutiveAscendingDigits = true, MaximumNoOfConsecutiveDigits maxNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Two,
                                            bool requireMaxNoOfConsecutiveDescendingDigits = true, MaximumNoOfConsecutiveDigits maxNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Two,
                                            bool requireMaxNoOfConsecutiveAscendingCharacters = true, MaximumNoOfConsecutiveCharacters maxNoOfConsecutiveAscendingCharacters = MaximumNoOfConsecutiveCharacters.Two,
                                            bool requireMaxNoOfConsecutiveDescendingCharacters = true, MaximumNoOfConsecutiveCharacters maxNoOfConsecutiveDescendingCharacters = MaximumNoOfConsecutiveCharacters.Two,
                                            bool requireRepeatingSequenceCheck = true, int minLengthOfRepeatingSequence = 2, Language language = Language.English)
            : base(PasswordStrengthValidator.GetRegexPattern(minimumLength, requireUppercase, minUppercase, requireLowercase, minLowercase,
                                                                requireDigit, minDigit, requireSpecialCharacter, minSpecialCharacter, specialCharacters,
                                                                requireMaxNoOfSameConsecutiveCharacters, maxNoOfSameConsecutiveCharacters,
                                                                requireMaxNoOfConsecutiveAscendingDigits, maxNoOfConsecutiveAscendingDigits,
                                                                requireMaxNoOfConsecutiveDescendingDigits, maxNoOfConsecutiveDescendingDigits,
                                                                requireMaxNoOfConsecutiveAscendingCharacters, maxNoOfConsecutiveAscendingCharacters,
                                                                requireMaxNoOfConsecutiveDescendingCharacters, maxNoOfConsecutiveDescendingCharacters,
                                                                requireRepeatingSequenceCheck, minLengthOfRepeatingSequence, language))
        {
        }
    }
}
