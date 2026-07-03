using Bunit;
using Microsoft.AspNetCore.Components;
using MyPasswordStrength.Blazor;

namespace PasswordStrengthTests
{
    public class MyPasswordStrengthBlazorTests
    {
        public class TestModel
        {
            public string? Password { get; set; }
        }

        private void TestBody(MyPasswordStrengthOptions options, string? passwordToTest, bool? expectedResult)
        {
            var model = new TestModel { Password = "initial" };

            Action<string?, bool?> onValidationHandler = (pwd, isValid) =>
            {
                // Assert
                Assert.Equal(passwordToTest, pwd);
                Assert.Equal(expectedResult, isValid);
            };

            using var ctx = new BunitContext();
            var cut = ctx.Render<PasswordStrength>(ps =>
                ps.Add(p => p.StrengthOptions, options)
                  .Add(p => p.OnValidation, onValidationHandler)
                  .Add(p => p.Value, model.Password)
                  .Add(p => p.ValueChanged, EventCallback.Factory.Create<string>(this, v => model.Password = v))
                  .Add(p => p.ValueExpression, () => model.Password)
              );

            // Act — trigger the DOM "oninput" event
            cut.Find("input").Input(passwordToTest);

            // Assert — check rendered markup for bound value
            Assert.Equal(passwordToTest, model.Password);
        }

        [Theory]
        [InlineData("P@76abc0rDed123!", true)] // Valid password
        [InlineData("P@76abc0rDed123", false)] // Invalid password
        public void AllTogether(string passwordToTest, bool expectedResult)
        {
            // Arrange
            var options = new MyPasswordStrengthOptions
            {
                MinimumLength = 9,
                RequireUppercase = true,
                MinimumUppercase = 2,
                RequireLowercase = true,
                MinimumLowercase = 3,
                RequireDigit = true,
                MinimumDigit = 2,
                RequireSpecialCharacter = true,
                MinimumSpecialCharacter = 2,
                RequireMaximumNoOfSameConsecutiveCharacters = true,
                MaximumNoOfSameConsecutiveCharacters = 2,
                RequireMaximumNoOfConsecutiveAscendingDigits = true,
                MaximumNoOfConsecutiveAscendingDigits = MaximumNoOfConsecutiveDigits.Three,
                RequireMaximumNoOfConsecutiveDescendingDigits = true,
                MaximumNoOfConsecutiveDescendingDigits = MaximumNoOfConsecutiveDigits.Two,
                RequireMaximumNoOfConsecutiveAscendingCharacters = true,
                MaximumNoOfConsecutiveAscendingCharacters = MaximumNoOfConsecutiveCharacters.Three,
                RequireMaximumNoOfConsecutiveDescendingCharacters = true,
                MaximumNoOfConsecutiveDescendingCharacters = MaximumNoOfConsecutiveCharacters.Two,
                Language = Language.English
            };

            TestBody(options, passwordToTest, expectedResult);
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
            var options = new MyPasswordStrengthOptions();

            TestBody(options, passwordToTest, expectedResult);
        }

        [Theory]
        [InlineData("", null)] // Validation should not be performed on empty password
        public void EmptyPassword(string? passwordToTest, bool? expectedResult)
        {
            var options = new MyPasswordStrengthOptions();

            TestBody(options, passwordToTest, expectedResult);
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
                RequireRepeatingSequenceCheck = false,
                RequireMaximumNoOfSameConsecutiveCharacters = true,
                MaximumNoOfSameConsecutiveCharacters = 2
            };

            TestBody(options, passwordToTest, expectedResult);
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

            TestBody(options, passwordToTest, expectedResult);
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

            TestBody(options, passwordToTest, expectedResult);
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

            TestBody(options, passwordToTest, expectedResult);
        }

        [Theory]
        [InlineData("Password1!", MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, true)]
        [InlineData("Pabword1!", MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, true)]
        [InlineData("Pabcword1!", MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("Pabwordc1!", MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, true)]
        [InlineData("Pabcwordc1!", MaximumNoOfConsecutiveCharacters.Three, MaximumNoOfConsecutiveCharacters.Two, true)]
        [InlineData("Pabwordcb1!", MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Three, true)]
        [InlineData("Pabcwordcb1!", MaximumNoOfConsecutiveCharacters.Three, MaximumNoOfConsecutiveCharacters.Three, true)]
        [InlineData("PAbCdwordCBa1!", MaximumNoOfConsecutiveCharacters.Four, MaximumNoOfConsecutiveCharacters.Four, true)]
        [InlineData("PABcdworDCa1!", MaximumNoOfConsecutiveCharacters.Four, MaximumNoOfConsecutiveCharacters.Three, true)]
        [InlineData("Passwordcb1!", MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("PaBcwordC1!", MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("PaBcwordCb1!", MaximumNoOfConsecutiveCharacters.Three, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("PAbCdwordbCa1!", MaximumNoOfConsecutiveCharacters.Three, MaximumNoOfConsecutiveCharacters.Three, false)]
        [InlineData("PABcdworDCa1!", MaximumNoOfConsecutiveCharacters.Four, MaximumNoOfConsecutiveCharacters.Two, true)]
        public void MaxNoOfConsecutiveAscendingDescendingCharacters(string passwordToTest, MaximumNoOfConsecutiveCharacters maxConsecutiveAscendingCharacters,
                                                                    MaximumNoOfConsecutiveCharacters maxConsecutiveDescendingCharacters, bool expectedResult)
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
                RequireMaximumNoOfConsecutiveDescendingDigits = false,
                RequireMaximumNoOfConsecutiveAscendingCharacters = true,
                MaximumNoOfConsecutiveAscendingCharacters = maxConsecutiveAscendingCharacters,
                RequireMaximumNoOfConsecutiveDescendingCharacters = true,
                MaximumNoOfConsecutiveDescendingCharacters = maxConsecutiveDescendingCharacters
            };

            TestBody(options, passwordToTest, expectedResult);
        }

        [Theory]
        [InlineData("Password1!", Language.English, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, true)]
        [InlineData("তুমি কেমন আছো?কখ!খক", Language.Bangla, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, true)]
        [InlineData("मेरा पासवर्ड है1कख!खक", Language.Hindi, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, true)]
        [InlineData("ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ?1ਤਥ!ਥਤ", Language.Punjabi, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, true)]
        [InlineData("見到你很高興丐丑1丑丐@!", Language.Chinese, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, true)]
        [InlineData("어떻게 지내세요?1떻떼!떼떻", Language.Korean, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, true)]
        [InlineData("おはようございます1こご@ごこ", Language.Japanese, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, true)]
        [InlineData("آپ سے مل کے اچھا لگا", Language.Urdu, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, true)]
        [InlineData("صباح الخير@حخ!", Language.Arabic, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, true)]
        [InlineData("נעים להכיר אות@אב1בא@", Language.Hebrew, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, true)]
        [InlineData("PaBcwordC1!", Language.English, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("তুমি কেমন আছো?কখগ!", Language.Bangla, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("তুমি কেমন আছো?গখক!", Language.Bangla, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("मेरा पासवर्ड है1कखग!", Language.Hindi, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("मेरा पासवर्ड है1गखक!", Language.Hindi, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ?1ਤਥਦ!", Language.Punjabi, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ?1ਦਥਤ!", Language.Punjabi, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("어떻게 지내세요?1떻떼떽!", Language.Korean, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("어떻게 지내세요?1떽떼떻!", Language.Korean, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("見到你很高興1丐丑丒@!", Language.Chinese, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("見到你很高興1丒丑丐@!", Language.Chinese, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("おはようございます1こごさ@", Language.Japanese, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("おはようございます1さごこ@", Language.Japanese, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("آپ سے سشص مل کے اچھا لگا", Language.Urdu, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("آپ سے صشس مل کے اچھا لگا", Language.Urdu, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("صباح الخير@حخد!", Language.Arabic, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("صباح الخير@دخح!", Language.Arabic, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("נעים להכיר אותך1 גבא", Language.Hebrew, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        [InlineData("נעים להכיר אותך1 אבג", Language.Hebrew, MaximumNoOfConsecutiveCharacters.Two, MaximumNoOfConsecutiveCharacters.Two, false)]
        public void MultiLingualMaxNoOfConsecutiveAscendingDescendingCharacters(string passwordToTest, Language language,
                                                                    MaximumNoOfConsecutiveCharacters maxConsecutiveAscendingCharacters,
                                                                    MaximumNoOfConsecutiveCharacters maxConsecutiveDescendingCharacters,
                                                                    bool expectedResult)
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
                RequireMaximumNoOfConsecutiveDescendingDigits = false,
                RequireRepeatingSequenceCheck = false,
                RequireMaximumNoOfConsecutiveAscendingCharacters = true,
                MaximumNoOfConsecutiveAscendingCharacters = maxConsecutiveAscendingCharacters,
                RequireMaximumNoOfConsecutiveDescendingCharacters = true,
                MaximumNoOfConsecutiveDescendingCharacters = maxConsecutiveDescendingCharacters,
                Language = language
            };

            TestBody(options, passwordToTest, expectedResult);
        }

        [Theory]
        [InlineData("তুমি কেমন আ1@1", Language.Bangla, true)] //Valid
        [InlineData("তুমি 1@!", Language.Bangla, false)] //Invalid
        [InlineData("मेरा पासवर्ड है1@1", Language.Hindi, true)] //Valid
        [InlineData("मेरा1@1", Language.Hindi, false)] //Invalid
        [InlineData("ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ?1@1", Language.Punjabi, true)] //Valid
        [InlineData("ਤੁਹਾ1@1", Language.Punjabi, false)] //Invalid
        [InlineData("見到你很高興1@!", Language.Chinese, true)] //Valid
        [InlineData("見到你很1@!", Language.Chinese, false)] //Invalid
        [InlineData("어떻게 지내세요?1!", Language.Korean, true)] //Valid
        [InlineData("어떻게 지?1!", Language.Korean, false)] //Invalid
        [InlineData("おはようございます1@", Language.Japanese, true)] //Valid
        [InlineData("おはよう1@!", Language.Japanese, false)] //Invalid
        [InlineData("آپ سے مل کے اچھا لگا1@1", Language.Urdu, true)] //Valid
        [InlineData("پ سے م1314", Language.Urdu, false)] //Invalid
        [InlineData("صباح الخيرح1!1", Language.Arabic, true)] //Valid
        [InlineData("صباح1!1", Language.Arabic, false)] //Invalid
        [InlineData("1!נעים להכיר אות@אב1@", Language.Hebrew, true)] //Valid
        [InlineData("אב1בא@3", Language.Hebrew, false)] //Invalid
        public void MultilingualMinNoOfCharacters(string passwordToTest, Language language, bool expectedResult)
        {
            var options = new MyPasswordStrengthOptions
            {
                MinimumLength = 6,
                RequireDigit = false,
                RequireSpecialCharacter = false,
                RequireMaximumNoOfSameConsecutiveCharacters = false,
                RequireMaximumNoOfConsecutiveAscendingDigits = false,
                RequireMaximumNoOfConsecutiveAscendingCharacters = false,
                RequireMaximumNoOfConsecutiveDescendingDigits = false,
                RequireMaximumNoOfConsecutiveDescendingCharacters = false,
                RequireRepeatingSequenceCheck = false,
                RequireLowercase = false,
                RequireUppercase = true,
                MinimumUppercase = 5,
                Language = language
            };

            TestBody(options, passwordToTest, expectedResult);
        }

        [Theory]
        [InlineData("PassworD1!", 2, true)] // Valid password
        [InlineData("P@ss1worD@ss!", 4, true)] // Valid password
        [InlineData("मेरा पासवर्ड हैप1!", 2, true)] // Valid password
        [InlineData("נעים להכיר אותך1", 2, true)] // Valid password
        [InlineData("P@ssworD@ss1!", 3, false)] // Invalid password
        [InlineData("P@ss@ssworD1!", 3, false)] // Invalid password
        [InlineData("मेरा पासवर्ड है पास1!", 2, false)] // Invalid password
        [InlineData("נעים להכיר אותך1 אבגך1", 2, false)] // Invalid password
        public void RepeatingSequence(string passwordToTest, int minLengthOfRepeatingSequence, bool expectedResult)
        {
            var options = new MyPasswordStrengthOptions
            {
                RequireMaximumNoOfSameConsecutiveCharacters = false,
                RequireLowercase = false,
                RequireUppercase = false,
                RequireDigit = false,
                RequireSpecialCharacter = false,
                RequireMaximumNoOfConsecutiveAscendingDigits = false,
                RequireMaximumNoOfConsecutiveDescendingDigits = false,
                RequireMaximumNoOfConsecutiveAscendingCharacters = false,
                RequireMaximumNoOfConsecutiveDescendingCharacters = false,
                RequireRepeatingSequenceCheck = true,
                MinimumLengthOfRepeatingSequence = minLengthOfRepeatingSequence
            };

            TestBody(options, passwordToTest, expectedResult);
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

            TestBody(options, passwordToTest, expectedResult);
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

            TestBody(options, passwordToTest, expectedResult);
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

            TestBody(options, passwordToTest, expectedResult);
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

            TestBody(options, passwordToTest, expectedResult);
        }
    }
}
