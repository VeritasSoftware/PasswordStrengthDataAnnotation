using MyPasswordStrength;
using System.ComponentModel.DataAnnotations;

namespace PasswordStrengthTests
{
    public class MyPasswordStrengthTests
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
            PasswordStrengthValidator.RequireMaxNoOfSameConsecutiveCharacters = true;
            PasswordStrengthValidator.MaxNoOfSameConsecutiveCharacters = 2;

            var result = passwordToTest.PasswordStrength();

            Assert.True(result == expectedResult);
        }

        [Theory]
        [InlineData("PasSwOrd1!", true)] // Valid password
        [InlineData("PassWORD1!", false)] // No uppercase letter        
        public void MinNoOfLowerCase(string passwordToTest, bool expectedResult)
        {
            PasswordStrengthValidator.RequireDigit = false;
            PasswordStrengthValidator.RequireSpecialCharacter = false;
            PasswordStrengthValidator.RequireMaxNoOfSameConsecutiveCharacters = false;
            PasswordStrengthValidator.RequireUppercase = false;
            PasswordStrengthValidator.RequireLowercase = true;
            PasswordStrengthValidator.MinLowercase = 5;

            var result = passwordToTest.PasswordStrength();

            Assert.True(result == expectedResult);
        }

        [Theory]
        [InlineData("PaSSwOrD1!", true)] // Valid password
        [InlineData("PaSSwoRd1!", false)]
        public void MinNoOfUpperCase(string passwordToTest, bool expectedResult)
        {
            PasswordStrengthValidator.RequireDigit = false;
            PasswordStrengthValidator.RequireSpecialCharacter = false;
            PasswordStrengthValidator.RequireMaxNoOfSameConsecutiveCharacters = false;            
            PasswordStrengthValidator.RequireLowercase = false;
            PasswordStrengthValidator.RequireUppercase = true;
            PasswordStrengthValidator.MinUppercase = 5;

            var result = passwordToTest.PasswordStrength();

            Assert.True(result == expectedResult);
        }

        [Theory]
        [InlineData("Passw0rD1!", true)] // Valid password
        [InlineData("PaSSwoRd1!", false)]
        public void MinNoOfDigits(string passwordToTest, bool expectedResult)
        {            
            PasswordStrengthValidator.RequireSpecialCharacter = false;
            PasswordStrengthValidator.RequireMaxNoOfSameConsecutiveCharacters = false;
            PasswordStrengthValidator.RequireLowercase = false;
            PasswordStrengthValidator.RequireUppercase = false;
            PasswordStrengthValidator.RequireDigit = true;
            PasswordStrengthValidator.MinDigit = 2;

            var result = passwordToTest.PasswordStrength();

            Assert.True(result == expectedResult);
        }

        [Theory]
        [InlineData("P@ssworD1!", true)] // Valid password
        [InlineData("PaSSwoRd1!", false)]
        public void MinNoOfSpecialCharacters(string passwordToTest, bool expectedResult)
        {            
            PasswordStrengthValidator.RequireMaxNoOfSameConsecutiveCharacters = false;
            PasswordStrengthValidator.RequireLowercase = false;
            PasswordStrengthValidator.RequireUppercase = false;
            PasswordStrengthValidator.RequireDigit = false;
            PasswordStrengthValidator.RequireSpecialCharacter = true;
            PasswordStrengthValidator.MinSpecialCharacter = 2;

            var result = passwordToTest.PasswordStrength();

            Assert.True(result == expectedResult);
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
            var result = passwordToTest.PasswordStrength();

            Assert.True(result == expectedResult);
        }
    }
}
