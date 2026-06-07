using MyPasswordStrength;

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
            var validator = new PasswordStrengthValidator
            {
                MinimumLength = 8,
                RequireUppercase = true,
                MinUppercase = 1,
                RequireLowercase = true,
                MinLowercase = 1,
                RequireDigit = true,
                MinDigit = 1,
                RequireSpecialCharacter = true,
                MinSpecialCharacter = 1,
                SpecialCharacters = "!@#$%^&*()",
                RequireMaxNoOfSameConsecutiveCharacters = true,
                MaxNoOfSameConsecutiveCharacters = 2
            };
            var result = validator.PasswordStrength(passwordToTest);
            Assert.True(result == expectedResult);
        }

        [Theory]
        [InlineData("Password1!", MaxNoOfConsecutiveDigits.Two, true)]
        [InlineData("Password12!", MaxNoOfConsecutiveDigits.Two, true)]
        [InlineData("Pa56word12!", MaxNoOfConsecutiveDigits.Two, true)]
        [InlineData("Pa56word123!", MaxNoOfConsecutiveDigits.Three, true)]
        [InlineData("Pa567word123!", MaxNoOfConsecutiveDigits.Three, true)]
        [InlineData("Password123!", MaxNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa567word12!", MaxNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa56word123!", MaxNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa567word123!", MaxNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa567word1234!", MaxNoOfConsecutiveDigits.Three, false)]
        public void MaxNoOfConsecutiveAscendingDigits(string passwordToTest, MaxNoOfConsecutiveDigits maxConsecutiveDigits, bool expectedResult)
        {
            var validator = new PasswordStrengthValidator
            {
                MinimumLength = 8,
                RequireUppercase = false,
                RequireLowercase = false,
                RequireDigit = false,
                RequireSpecialCharacter = false,
                RequireMaxNoOfSameConsecutiveCharacters = false,
                RequireMaxNoOfConsecutiveAscendingDigits = true,
                MaxNoOfConsecutiveAscendingDigits = maxConsecutiveDigits
            };
            var result = validator.PasswordStrength(passwordToTest);
            Assert.Equal(expectedResult, result);
        }

        [Theory]
        [InlineData("Password1!", MaxNoOfConsecutiveDigits.Two, true)]
        [InlineData("Password21!", MaxNoOfConsecutiveDigits.Two, true)]
        [InlineData("Pa65word21!", MaxNoOfConsecutiveDigits.Two, true)]
        [InlineData("Pa65word321!", MaxNoOfConsecutiveDigits.Three, true)]
        [InlineData("Pa765word321!", MaxNoOfConsecutiveDigits.Three, true)]
        [InlineData("Password321!", MaxNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa765word21!", MaxNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa65word321!", MaxNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa765word321!", MaxNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa765word4321!", MaxNoOfConsecutiveDigits.Three, false)]
        public void MaxNoOfConsecutiveDescendingDigits(string passwordToTest, MaxNoOfConsecutiveDigits maxConsecutiveDigits, bool expectedResult)
        {
            var validator = new PasswordStrengthValidator
            {
                MinimumLength = 8,
                RequireUppercase = false,
                RequireLowercase = false,
                RequireDigit = false,
                RequireSpecialCharacter = false,
                RequireMaxNoOfSameConsecutiveCharacters = false,
                RequireMaxNoOfConsecutiveAscendingDigits = false,
                RequireMaxNoOfConsecutiveDescendingDigits = true,
                MaxNoOfConsecutiveDescendingDigits = maxConsecutiveDigits
            };
            var result = validator.PasswordStrength(passwordToTest);
            Assert.Equal(expectedResult, result);
        }

        [Theory]
        [InlineData("Password1!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, true)]
        [InlineData("Pasword12!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, true)]
        [InlineData("Pasword21!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, true)]
        [InlineData("Pa12word43!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, true)]
        [InlineData("Pa45word87!", MaxNoOfConsecutiveDigits.Three, MaxNoOfConsecutiveDigits.Three, true)]
        [InlineData("Pa456word432!", MaxNoOfConsecutiveDigits.Three, MaxNoOfConsecutiveDigits.Three, true)]
        [InlineData("Password123!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa987word!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa654word234!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa56word321!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa7654word12!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Three, false)]
        public void MaxNoOfConsecutiveAscendingDescendingDigits(string passwordToTest, MaxNoOfConsecutiveDigits maxConsecutiveAscendingDigits, MaxNoOfConsecutiveDigits maxConsecutiveDescendingDigits, bool expectedResult)
        {
            var validator = new PasswordStrengthValidator
            {
                MinimumLength = 8,
                RequireUppercase = false,
                RequireLowercase = false,
                RequireDigit = false,
                RequireSpecialCharacter = false,
                RequireMaxNoOfSameConsecutiveCharacters = false,
                RequireMaxNoOfConsecutiveAscendingDigits = true,
                MaxNoOfConsecutiveAscendingDigits = maxConsecutiveAscendingDigits,
                RequireMaxNoOfConsecutiveDescendingDigits = true,
                MaxNoOfConsecutiveDescendingDigits = maxConsecutiveDescendingDigits
            };

            var result = validator.PasswordStrength(passwordToTest);
            Assert.Equal(expectedResult, result);
        }

        [Theory]
        [InlineData("PasSwOrd1!", true)] // Valid password
        [InlineData("PassWORD1!", false)] // No uppercase letter        
        public void MinNoOfLowerCase(string passwordToTest, bool expectedResult)
        {
            var validator = new PasswordStrengthValidator
            {
                RequireDigit = false,
                RequireSpecialCharacter = false,
                RequireMaxNoOfSameConsecutiveCharacters = false,
                RequireUppercase = false,
                RequireLowercase = true,
                MinLowercase = 5
            };

            var result = validator.PasswordStrength(passwordToTest);

            Assert.True(result == expectedResult);
        }

        [Theory]
        [InlineData("PaSSwOrD1!", true)] // Valid password
        [InlineData("PaSSwoRd1!", false)]
        public void MinNoOfUpperCase(string passwordToTest, bool expectedResult)
        {
            var validator = new PasswordStrengthValidator
            {
                RequireDigit = false,
                RequireSpecialCharacter = false,
                RequireMaxNoOfSameConsecutiveCharacters = false,
                RequireLowercase = false,
                RequireUppercase = true,
                MinUppercase = 5
            };

            var result = validator.PasswordStrength(passwordToTest);

            Assert.True(result == expectedResult);
        }

        [Theory]
        [InlineData("Passw0rD1!", true)] // Valid password
        [InlineData("PaSSwoRd1!", false)]
        public void MinNoOfDigits(string passwordToTest, bool expectedResult)
        {
            var validator = new PasswordStrengthValidator
            {
                RequireSpecialCharacter = false,
                RequireMaxNoOfSameConsecutiveCharacters = false,
                RequireLowercase = false,
                RequireUppercase = false,
                RequireDigit = true,
                MinDigit = 2
            };

            var result = validator.PasswordStrength(passwordToTest);

            Assert.True(result == expectedResult);
        }

        [Theory]
        [InlineData("P@ssworD1!", true)] // Valid password
        [InlineData("PaSSwoRd1!", false)]
        public void MinNoOfSpecialCharacters(string passwordToTest, bool expectedResult)
        {            
            var validator = new PasswordStrengthValidator
            {
                RequireMaxNoOfSameConsecutiveCharacters = false,
                RequireLowercase = false,
                RequireUppercase = false,
                RequireDigit = false,
                RequireSpecialCharacter = true,
                MinSpecialCharacter = 2
            };

            var result = validator.PasswordStrength(passwordToTest);

            Assert.True(result == expectedResult);
        }

        [Theory]
        [InlineData("Password1!", true)] // Valid password
        [InlineData("password1!", false)] // No uppercase letter
        [InlineData("PASSWORD1!", false)] // No lowercase letter
        [InlineData("Password!!", false)] // No digit
        [InlineData("Password11", false)] // No special character
        [InlineData("Pwd11", false)] // Less than minimum length
        public void Defaults(string passwordToTest, bool expectedResult)
        {
            var validator = new PasswordStrengthValidator();

            var result = validator.PasswordStrength(passwordToTest);

            Assert.True(result == expectedResult);
        }
    }
}
