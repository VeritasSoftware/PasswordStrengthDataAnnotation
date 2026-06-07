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
                RequireMaximumNoOfSameConsecutiveCharacters = true,
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
        [InlineData("Password1!", MaximumNoOfConsecutiveDigits.Two, true)]
        [InlineData("Password12!", MaximumNoOfConsecutiveDigits.Two, true)]
        [InlineData("Pa56word12!", MaximumNoOfConsecutiveDigits.Two, true)]
        [InlineData("Pa56word123!", MaximumNoOfConsecutiveDigits.Three, true)]
        [InlineData("Pa567word123!", MaximumNoOfConsecutiveDigits.Three, true)]
        [InlineData("Password123!", MaximumNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa567word12!", MaximumNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa56word123!", MaximumNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa567word123!", MaximumNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa567word1234!", MaximumNoOfConsecutiveDigits.Three, false)]
        public void MaxNoOfConsecutiveAscendingDigits(string passwordToTest, MaximumNoOfConsecutiveDigits maxConsecutiveDigits, bool expectedResult)
        {
            var options = new MyPasswordStrengthOptions
            {
                MinimumLength = 8,
                RequireUppercase = false,
                RequireLowercase = false,
                RequireDigit = false,
                RequireSpecialCharacter = false,
                RequireMaximumNoOfSameConsecutiveCharacters = false,
                RequireMaximumNoOfConsecutiveAscendingDigits = true,
                MaximumNoOfConsecutiveAscendingDigits = maxConsecutiveDigits
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
        [InlineData("Password1!", MaximumNoOfConsecutiveDigits.Two, true)]
        [InlineData("Password21!", MaximumNoOfConsecutiveDigits.Two, true)]
        [InlineData("Pa65word21!", MaximumNoOfConsecutiveDigits.Two, true)]
        [InlineData("Pa65word321!", MaximumNoOfConsecutiveDigits.Three, true)]
        [InlineData("Pa765word321!", MaximumNoOfConsecutiveDigits.Three, true)]
        [InlineData("Password321!", MaximumNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa765word21!", MaximumNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa65word321!", MaximumNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa765word321!", MaximumNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa765word4321!", MaximumNoOfConsecutiveDigits.Three, false)]
        public void MaxNoOfConsecutiveDescendingDigits(string passwordToTest, MaximumNoOfConsecutiveDigits maxConsecutiveDigits, bool expectedResult)
        {
            var options = new MyPasswordStrengthOptions
            {
                MinimumLength = 8,
                RequireUppercase = false,
                RequireLowercase = false,
                RequireDigit = false,
                RequireSpecialCharacter = false,
                RequireMaximumNoOfSameConsecutiveCharacters = false,
                RequireMaximumNoOfConsecutiveAscendingDigits = false,
                RequireMaximumNoOfConsecutiveDescendingDigits = true,
                MaximumNoOfConsecutiveDescendingDigits = maxConsecutiveDigits
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
        [InlineData("Password1!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, true)]
        [InlineData("Pasword12!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, true)]
        [InlineData("Pasword21!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, true)]
        [InlineData("Pa12word43!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, true)]
        [InlineData("Password1243!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, true)]
        [InlineData("Password123876!", MaximumNoOfConsecutiveDigits.Three, MaximumNoOfConsecutiveDigits.Three, true)]
        [InlineData("Pa45word87!", MaximumNoOfConsecutiveDigits.Three, MaximumNoOfConsecutiveDigits.Three, true)]
        [InlineData("Pa456word432!", MaximumNoOfConsecutiveDigits.Three, MaximumNoOfConsecutiveDigits.Three, true)]
        [InlineData("Password123!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa987word!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa654word234!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa56word321!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa7654word12!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Three, false)]
        [InlineData("Password123765!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, false)]
        [InlineData("Password123654!", MaximumNoOfConsecutiveDigits.Two, MaximumNoOfConsecutiveDigits.Two, false)]
        public void MaxNoOfConsecutiveAscendingDescendingDigits(string passwordToTest, MaximumNoOfConsecutiveDigits maxConsecutiveAscendingDigits, 
                                                                    MaximumNoOfConsecutiveDigits maxConsecutiveDescendingDigits, bool expectedResult)
        {
            var options = new MyPasswordStrengthOptions
            {
                MinimumLength = 8,
                RequireUppercase = false,
                RequireLowercase = false,
                RequireDigit = false,
                RequireSpecialCharacter = false,
                RequireMaximumNoOfSameConsecutiveCharacters = false,
                RequireMaximumNoOfConsecutiveAscendingDigits = true,
                MaximumNoOfConsecutiveAscendingDigits = maxConsecutiveAscendingDigits,
                RequireMaximumNoOfConsecutiveDescendingDigits = true,
                MaximumNoOfConsecutiveDescendingDigits = maxConsecutiveDescendingDigits
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
                RequireMaximumNoOfSameConsecutiveCharacters = false,
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
                RequireMaximumNoOfSameConsecutiveCharacters = false,
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
                RequireMaximumNoOfSameConsecutiveCharacters = false,
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
                RequireMaximumNoOfSameConsecutiveCharacters = false,
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
