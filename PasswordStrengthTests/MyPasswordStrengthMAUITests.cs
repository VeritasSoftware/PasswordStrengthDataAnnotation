using MyPasswordStrength;
using System.Runtime.Versioning;

namespace PasswordStrengthTests
{
    [SupportedOSPlatform("android")]
    [SupportedOSPlatform("ios")]
    [SupportedOSPlatform("maccatalyst")]
    [SupportedOSPlatform("windows")]
    public class MyPasswordStrengthMAUITests
    {
        [Theory]
        [InlineData("Password1!", true)] // Valid password
        [InlineData("password1!", false)] // No uppercase letter
        [InlineData("PASSWORD1!", false)] // No lowercase letter
        [InlineData("Password!!", false)] // No digit
        [InlineData("Password11", false)] // No special character
        [InlineData("Pwd11", false)] // Less than minimum length
        public void Defaults(string passwordToTest, bool expectedResult)
        {
            bool? result = null;

            var entry = new PasswordStrengthEntry((pwd, isValid) =>
            {
                result = isValid;
            });

            // Set the entry text so the entry runs.
            entry.Text = passwordToTest;

            Assert.True(result.HasValue);
            Assert.True(result.Value == expectedResult);
        }

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
            var options = new MyPasswordStrengthOptions
            {
                MinimumLength = 8,
                RequireUppercase = true,
                MinimumUppercase = 1,
                RequireLowercase = true,
                MinimumLowercase = 1,
                RequireDigit = true,
                MinimumDigit = 1,
                RequireSpecialCharacter = true,
                MinimumSpecialCharacter = 1,
                SpecialCharacters = "!@#$%^&*()",
                RequireMaxNoOfSameConsecutiveCharacters = true,
                MaximumNoOfSameConsecutiveCharacters = 2
            };

            bool? result = null;

            var entry = new PasswordStrengthEntry((pwd, isValid) =>
            {
                result = isValid;
            }, options);

            // Set the entry text so the entry runs.
            entry.Text = passwordToTest;

            Assert.True(result.HasValue);
            Assert.True(result.Value == expectedResult);
        }

        [Theory]
        [InlineData("PasSwOrd1!", true)] // Valid password
        [InlineData("PassWORD1!", false)] // No uppercase letter        
        public void MinNoOfLowerCase(string passwordToTest, bool expectedResult)
        {
            var options = new MyPasswordStrengthOptions
            {
                RequireDigit = false,
                RequireSpecialCharacter = false,
                RequireMaxNoOfSameConsecutiveCharacters = false,
                RequireUppercase = false,
                RequireLowercase = true,
                MinimumLowercase = 5
            };

            bool? result = null;

            var entry = new PasswordStrengthEntry((pwd, isValid) =>
            {
                result = isValid;
            }, options);

            // Set the entry text so the entry runs.
            entry.Text = passwordToTest;

            Assert.True(result.HasValue);
            Assert.True(result.Value == expectedResult);
        }

        [Theory]
        [InlineData("PaSSwOrD1!", true)] // Valid password
        [InlineData("PaSSwoRd1!", false)]
        public void MinNoOfUpperCase(string passwordToTest, bool expectedResult)
        {
            var options = new MyPasswordStrengthOptions
            {
                RequireDigit = false,
                RequireSpecialCharacter = false,
                RequireMaxNoOfSameConsecutiveCharacters = false,
                RequireLowercase = false,
                RequireUppercase = true,
                MinimumUppercase = 5
            };

            bool? result = null;

            var entry = new PasswordStrengthEntry((pwd, isValid) =>
            {
                result = isValid;
            }, options);

            // Set the entry text so the entry runs.
            entry.Text = passwordToTest;

            Assert.True(result.HasValue);
            Assert.True(result.Value == expectedResult);
        }

        [Theory]
        [InlineData("Passw0rD1!", true)] // Valid password
        [InlineData("PaSSwoRd1!", false)]
        public void MinNoOfDigits(string passwordToTest, bool expectedResult)
        {
            var options = new MyPasswordStrengthOptions
            {
                RequireSpecialCharacter = false,
                RequireMaxNoOfSameConsecutiveCharacters = false,
                RequireLowercase = false,
                RequireUppercase = false,
                RequireDigit = true,
                MinimumDigit = 2
            };

            bool? result = null;

            var entry = new PasswordStrengthEntry((pwd, isValid) =>
            {
                result = isValid;
            }, options);

            // Set the entry text so the entry runs.
            entry.Text = passwordToTest;

            Assert.True(result.HasValue);
            Assert.True(result.Value == expectedResult);
        }

        [Theory]
        [InlineData("P@ssworD1!", true)] // Valid password
        [InlineData("PaSSwoRd1!", false)]
        public void MinNoOfSpecialCharacters(string passwordToTest, bool expectedResult)
        {
            var options = new MyPasswordStrengthOptions
            {
                RequireMaxNoOfSameConsecutiveCharacters = false,
                RequireLowercase = false,
                RequireUppercase = false,
                RequireDigit = false,
                RequireSpecialCharacter = true,
                MinimumSpecialCharacter = 2
            };

            bool? result = null;

            var entry = new PasswordStrengthEntry((pwd, isValid) =>
            {
                result = isValid;
            }, options);

            // Set the entry text so the entry runs.
            entry.Text = passwordToTest;

            Assert.True(result.HasValue);
            Assert.True(result.Value == expectedResult);
        }
    }
}
