using System.ComponentModel.DataAnnotations;
using Your.Namespace;

namespace PasswordStrengthTests
{
    public class PasswordStrengthAttributeTests
    {
        [Theory]
        [InlineData("Password1!", true)]
        [InlineData("Passworrd1!", true)]
        [InlineData("Passwordss1!", true)]        
        [InlineData("Passsword1!", false)]
        [InlineData("Passwordsss1!", false)]
        [InlineData("Password111!", false)]
        [InlineData("Password1!!!", false)]
        public void MaxNoOfSameConsecutiveCharacters(string passwordToTest, bool expectedResult)
        {
            var attribute = new PasswordStrengthAttribute(
                requireMaxNoOfSameConsecutiveCharacters: true,
                maxNoOfSameConsecutiveCharacters: 2
            );

            var result = attribute.GetValidationResult(passwordToTest, new ValidationContext(passwordToTest));

            var successResult = result == ValidationResult.Success;

            Assert.True(successResult == expectedResult);
        }

        [Theory]
        [InlineData("Password1!", true)] // Valid password
        [InlineData("password1!", false)] // No uppercase letter
        [InlineData("PASSWORD1!", false)] // No lowercase letter
        [InlineData("Password!!", false)] // No digit
        [InlineData("Password11", false)] // No special character
        [InlineData("Pwd11", false)] // Less than minimum length
        public void Miscellaneous(string passwordToTest, bool expectedResult)
        {
            var attribute = new PasswordStrengthAttribute();

            var result = attribute.GetValidationResult(passwordToTest, new ValidationContext(passwordToTest));

            var successResult = result == ValidationResult.Success;

            Assert.True(successResult == expectedResult);
        }

        [Theory]
        [InlineData("PasSwOrd1!", true)] // Valid password
        [InlineData("PassWORD1!", false)] // No uppercase letter        
        public void MinNoOfLowerCase(string passwordToTest, bool expectedResult)
        {
            var attribute = new PasswordStrengthAttribute(
                requireDigit: false,
                requireSpecialCharacter: false,
                requireMaxNoOfSameConsecutiveCharacters: false,
                requireUppercase: false,
                requireLowercase: true,
                minLower: 5);

            var result = attribute.GetValidationResult(passwordToTest, new ValidationContext(passwordToTest));

            var successResult = result == ValidationResult.Success;

            Assert.True(successResult == expectedResult);
        }

        [Theory]
        [InlineData("PaSSwOrD1!", true)] // Valid password
        [InlineData("PaSSwoRd1!", false)]      
        public void MinNoOfUpperCase(string passwordToTest, bool expectedResult)
        {
            var attribute = new PasswordStrengthAttribute(
                requireDigit: false,
                requireSpecialCharacter: false,
                requireMaxNoOfSameConsecutiveCharacters: false,                
                requireLowercase: false,
                requireUppercase: true,
                minUpper: 5);

            var result = attribute.GetValidationResult(passwordToTest, new ValidationContext(passwordToTest));

            var successResult = result == ValidationResult.Success;

            Assert.True(successResult == expectedResult);
        }

        [Theory]
        [InlineData("Passw0rD1!", true)] // Valid password
        [InlineData("PaSSwoRd1!", false)]
        public void MinNoOfDigits(string passwordToTest, bool expectedResult)
        {
            var attribute = new PasswordStrengthAttribute(                
                requireSpecialCharacter: false,
                requireMaxNoOfSameConsecutiveCharacters: false,
                requireLowercase: false,
                requireUppercase: false,
                requireDigit: true,
                minDigit: 2);

            var result = attribute.GetValidationResult(passwordToTest, new ValidationContext(passwordToTest));

            var successResult = result == ValidationResult.Success;

            Assert.True(successResult == expectedResult);
        }

        [Theory]
        [InlineData("P@ssworD1!", true)] // Valid password
        [InlineData("PaSSwoRd1!", false)]
        public void MinNoOfSpecialCharacters(string passwordToTest, bool expectedResult)
        {
            var attribute = new PasswordStrengthAttribute(                
                requireMaxNoOfSameConsecutiveCharacters: false,
                requireLowercase: false,
                requireUppercase: false,
                requireDigit: false,
                requireSpecialCharacter: true,
                minSpecialCharacter: 2);

            var result = attribute.GetValidationResult(passwordToTest, new ValidationContext(passwordToTest));

            var successResult = result == ValidationResult.Success;

            Assert.True(successResult == expectedResult);
        }
    }
}