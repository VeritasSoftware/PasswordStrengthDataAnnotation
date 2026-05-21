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
            var attribute = new PasswordStrengthAttribute
            {
                RequireMaxNoOfSameConsecutiveCharacters = true,
                MaxNoOfSameConsecutiveCharacters = 2
            };

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
    }
}