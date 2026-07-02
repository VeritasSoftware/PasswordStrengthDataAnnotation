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

        [Theory]
        [InlineData("P@76abc0rDed123!", true)] // Valid password
        [InlineData("P@76abc0rDed123", false)] // Invalid password
        public void AllTogether(string passwordToTest, bool expectedResult)
        {
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
                MaximumNoOfConsecutiveDescendingCharacters = MaximumNoOfConsecutiveCharacters.Two
            };

            // Arrange
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
    }
}
