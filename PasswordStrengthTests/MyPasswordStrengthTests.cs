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
                RequireRepeatingSequenceCheck = false,
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
        [InlineData("Password1243!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, true)]
        [InlineData("Password123876!", MaxNoOfConsecutiveDigits.Three, MaxNoOfConsecutiveDigits.Three, true)]
        [InlineData("Pa45word87!", MaxNoOfConsecutiveDigits.Three, MaxNoOfConsecutiveDigits.Three, true)]
        [InlineData("Pa456word432!", MaxNoOfConsecutiveDigits.Three, MaxNoOfConsecutiveDigits.Three, true)]
        [InlineData("Password123!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa987word!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa654word234!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa56word321!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, false)]
        [InlineData("Pa7654word12!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Three, false)]
        [InlineData("Password123765!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, false)]
        [InlineData("Password123654!", MaxNoOfConsecutiveDigits.Two, MaxNoOfConsecutiveDigits.Two, false)]
        public void MaxNoOfConsecutiveAscendingDescendingDigits(string passwordToTest, MaxNoOfConsecutiveDigits maxConsecutiveAscendingDigits, 
                                                                    MaxNoOfConsecutiveDigits maxConsecutiveDescendingDigits, bool expectedResult)
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
        [InlineData("Password1!", MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, true)]
        [InlineData("Pabword1!", MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, true)]
        [InlineData("PABcdworDCa1!", MaxNoOfConsecutiveCharacters.Four, MaxNoOfConsecutiveCharacters.Two, true)]
        [InlineData("Pabwordc1!", MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, true)]
        [InlineData("Pabcwordc1!", MaxNoOfConsecutiveCharacters.Three, MaxNoOfConsecutiveCharacters.Three, true)]
        [InlineData("Pabwordcb1!", MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Three, true)]
        [InlineData("Pabcwordcb1!", MaxNoOfConsecutiveCharacters.Three, MaxNoOfConsecutiveCharacters.Three, true)]
        [InlineData("PAbCdwordCBa1!", MaxNoOfConsecutiveCharacters.Four, MaxNoOfConsecutiveCharacters.Four, true)]
        [InlineData("PABcdworDCa1!", MaxNoOfConsecutiveCharacters.Four, MaxNoOfConsecutiveCharacters.Three, true)]
        [InlineData("Pabcword1!", MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("Passwordcb1!", MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("PaBcwordC1!", MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("PaBcwordCb1!", MaxNoOfConsecutiveCharacters.Three, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("PAbCdwordbCa1!", MaxNoOfConsecutiveCharacters.Three, MaxNoOfConsecutiveCharacters.Three, false)]
        public void MaxNoOfConsecutiveAscendingDescendingCharacters(string passwordToTest, MaxNoOfConsecutiveCharacters maxConsecutiveAscendingCharacters,
                                                                    MaxNoOfConsecutiveCharacters maxConsecutiveDescendingCharacters, bool expectedResult)
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
                RequireMaxNoOfConsecutiveDescendingDigits = false,
                RequireMaxNoOfConsecutiveAscendingCharacters = true,
                MaxNoOfConsecutiveAscendingCharacters = maxConsecutiveAscendingCharacters,
                RequireMaxNoOfConsecutiveDescendingCharacters = true,
                MaxNoOfConsecutiveDescendingCharacters = maxConsecutiveDescendingCharacters
            };

            var result = validator.PasswordStrength(passwordToTest);
            Assert.Equal(expectedResult, result);
        }

        [Theory]
        [InlineData("Password1!", Language.English, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, true)]
        [InlineData("তুমি কেমন আছো?কখ!খক", Language.Bangla, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, true)]
        [InlineData("मेरा पासवर्ड है1कख!खक", Language.Hindi, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, true)]
        [InlineData("ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ?1ਤਥ!ਥਤ", Language.Punjabi, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, true)]
        [InlineData("見到你很高興丐丑1丑丐@!", Language.Chinese, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, true)]
        [InlineData("어떻게 지내세요?1떻떼!떼떻", Language.Korean, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, true)]
        [InlineData("おはようございます1こご@ごこ", Language.Japanese, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, true)]
        [InlineData("آپ سے مل کے اچھا لگا", Language.Urdu, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, true)]
        [InlineData("صباح الخير@حخ!", Language.Arabic, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, true)]
        [InlineData("נעים להכיר אות@אב1בא@", Language.Hebrew, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, true)]
        [InlineData("PaBcwordC1!", Language.English, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("তুমি কেমন আছো?কখগ!", Language.Bangla, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("তুমি কেমন আছো?গখক!", Language.Bangla, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("मेरा पासवर्ड है1कखग!", Language.Hindi, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("मेरा पासवर्ड है1गखक!", Language.Hindi, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ?1ਤਥਦ!", Language.Punjabi, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ?1ਦਥਤ!", Language.Punjabi, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("어떻게 지내세요?1떻떼떽!", Language.Korean, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("어떻게 지내세요?1떽떼떻!", Language.Korean, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("見到你很高興1丐丑丒@!", Language.Chinese, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("見到你很高興1丒丑丐@!", Language.Chinese, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("おはようございます1こごさ@", Language.Japanese, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("おはようございます1さごこ@", Language.Japanese, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("آپ سے سشص مل کے اچھا لگا", Language.Urdu, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("آپ سے صشس مل کے اچھا لگا", Language.Urdu, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("صباح الخير@حخد!", Language.Arabic, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("صباح الخير@دخح!", Language.Arabic, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("נעים להכיר אותך1 גבא", Language.Hebrew, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        [InlineData("נעים להכיר אותך1 אבג", Language.Hebrew, MaxNoOfConsecutiveCharacters.Two, MaxNoOfConsecutiveCharacters.Two, false)]
        public void MultiLingualMaxNoOfConsecutiveAscendingDescendingCharacters(string passwordToTest, Language language,
                                                                    MaxNoOfConsecutiveCharacters maxConsecutiveAscendingCharacters,
                                                                    MaxNoOfConsecutiveCharacters maxConsecutiveDescendingCharacters,
                                                                    bool expectedResult)
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
                RequireMaxNoOfConsecutiveDescendingDigits = false,
                RequireRepeatingSequenceCheck = false,
                RequireMaxNoOfConsecutiveAscendingCharacters = true,
                MaxNoOfConsecutiveAscendingCharacters = maxConsecutiveAscendingCharacters,
                RequireMaxNoOfConsecutiveDescendingCharacters = true,
                MaxNoOfConsecutiveDescendingCharacters = maxConsecutiveDescendingCharacters,
                Language = language
            };

            var result = validator.PasswordStrength(passwordToTest);
            Assert.Equal(expectedResult, result);
        }

        [Theory]
        [InlineData("তুমি কেমন আ1@1", Language.Bangla, true)]
        [InlineData("তুমি 1@!", Language.Bangla, false)]
        [InlineData("मेरा पासवर्ड है1@1", Language.Hindi, true)]
        [InlineData("मेरा1@1", Language.Hindi, false)]
        [InlineData("ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ?1@1", Language.Punjabi, true)]
        [InlineData("ਤੁਹਾ1@1", Language.Punjabi, false)]
        [InlineData("見到你很高興1@!", Language.Chinese, true)]
        [InlineData("見到你很1@!", Language.Chinese, false)]
        [InlineData("어떻게 지내세요?1!", Language.Korean, true)]
        [InlineData("어떻게 지?1!", Language.Korean, false)]
        [InlineData("おはようございます1@", Language.Japanese, true)]
        [InlineData("おはよう1@!", Language.Japanese, false)]
        [InlineData("آپ سے مل کے اچھا لگا1@1", Language.Urdu, true)]
        [InlineData("پ سے م1314", Language.Urdu, false)]
        [InlineData("صباح الخيرح1!1", Language.Arabic, true)]
        [InlineData("صباح1!1", Language.Arabic, false)]
        [InlineData("1!נעים להכיר אות@אב1@", Language.Hebrew, true)]
        [InlineData("אב1בא@3", Language.Hebrew, false)]
        public void MultilingualMinNoOfCharacters(string passwordToTest, Language language, bool expectedResult)
        {
            var validator = new PasswordStrengthValidator
            {
                MinimumLength = 6,
                RequireDigit = false,
                RequireSpecialCharacter = false,
                RequireMaxNoOfSameConsecutiveCharacters = false,
                RequireMaxNoOfConsecutiveAscendingDigits = false,
                RequireMaxNoOfConsecutiveAscendingCharacters = false,
                RequireMaxNoOfConsecutiveDescendingDigits= false,
                RequireMaxNoOfConsecutiveDescendingCharacters= false,
                RequireRepeatingSequenceCheck= false,
                RequireLowercase = false,
                RequireUppercase = true,
                MinUppercase = 5,
                Language = language
            };

            var result = validator.PasswordStrength(passwordToTest);

            Assert.Equal(expectedResult, result);
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
            var validator = new PasswordStrengthValidator
            {
                RequireMaxNoOfSameConsecutiveCharacters = false,
                RequireLowercase = false,
                RequireUppercase = false,
                RequireDigit = false,
                RequireSpecialCharacter = false,                
                RequireMaxNoOfConsecutiveAscendingDigits = false,
                RequireMaxNoOfConsecutiveDescendingDigits = false,
                RequireMaxNoOfConsecutiveAscendingCharacters = false,
                RequireMaxNoOfConsecutiveDescendingCharacters = false,
                RequireRepeatingSequenceCheck = true,
                MinLengthOfRepeatingSequence = minLengthOfRepeatingSequence
            };

            var result = validator.PasswordStrength(passwordToTest);

            Assert.True(result == expectedResult);
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

        [Theory]
        [InlineData("P@76abc0rDed123!", true)] // Valid password
        public void AllTogether(string passwordToTest, bool expectedResult)
        {
            var validator = new PasswordStrengthValidator
            {
                MinimumLength = 9,
                RequireUppercase = true,
                MinUppercase = 2,
                RequireLowercase = true,
                MinLowercase = 3,
                RequireDigit = true,
                MinDigit = 2,
                RequireSpecialCharacter = true,
                MinSpecialCharacter = 2,
                RequireMaxNoOfSameConsecutiveCharacters = true,
                MaxNoOfSameConsecutiveCharacters = 2,
                RequireMaxNoOfConsecutiveAscendingDigits = true,
                MaxNoOfConsecutiveAscendingDigits = MaxNoOfConsecutiveDigits.Three,
                RequireMaxNoOfConsecutiveDescendingDigits = true,
                MaxNoOfConsecutiveDescendingDigits = MaxNoOfConsecutiveDigits.Two,
                RequireMaxNoOfConsecutiveAscendingCharacters = true,
                MaxNoOfConsecutiveAscendingCharacters = MaxNoOfConsecutiveCharacters.Three,
                RequireMaxNoOfConsecutiveDescendingCharacters = true,
                MaxNoOfConsecutiveDescendingCharacters = MaxNoOfConsecutiveCharacters.Two,
                RequireRepeatingSequenceCheck = true,
                MinLengthOfRepeatingSequence = 2
            };

            var result = validator.PasswordStrength(passwordToTest);

            Assert.True(result == expectedResult);
        }
    }
}
