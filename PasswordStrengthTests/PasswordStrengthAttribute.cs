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
