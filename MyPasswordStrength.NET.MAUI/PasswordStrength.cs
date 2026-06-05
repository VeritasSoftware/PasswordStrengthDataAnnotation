using System.Runtime.Versioning;
using MyPasswordStrength.Validator;

namespace MyPasswordStrength
{
    [System.Diagnostics.CodeAnalysis.SuppressMessage(
        "Interoperability",
        "CA1416:Validate platform compatibility",
        Justification = "PasswordStrengthEntry is a cross-platform MAUI control.")]
    [SupportedOSPlatform("android")]
    [SupportedOSPlatform("ios")]
    [SupportedOSPlatform("maccatalyst")]
    [SupportedOSPlatform("windows")]
    public class PasswordStrengthEntry: Entry
    {
        private readonly MyPasswordStrengthOptions _strengthOptions;
        private readonly PasswordStrengthValidator _validator;
        private readonly Action<string, bool> _onValidation;        

        public PasswordStrengthEntry(Action<string, bool> onValidation, MyPasswordStrengthOptions? strengthOptions = null,
                                        string? placeholder = "Enter password") 
        {
            _onValidation = onValidation;
            _strengthOptions = strengthOptions ?? new MyPasswordStrengthOptions();

            Placeholder = placeholder;
            Keyboard = Keyboard.Password;            

            var validator = new PasswordStrengthValidator();
            validator.MinimumLength = _strengthOptions.MinimumLength;
            validator.RequireUppercase = _strengthOptions.RequireUppercase;
            validator.MinUppercase = _strengthOptions.MinimumUppercase;
            validator.RequireLowercase = _strengthOptions.RequireLowercase;
            validator.MinLowercase = _strengthOptions.MinimumLowercase;
            validator.RequireDigit = _strengthOptions.RequireDigit;
            validator.MinDigit = _strengthOptions.MinimumDigit;
            validator.RequireSpecialCharacter = _strengthOptions.RequireSpecialCharacter;
            validator.MinSpecialCharacter = _strengthOptions.MinimumSpecialCharacter;
            validator.SpecialCharacters = _strengthOptions.SpecialCharacters;
            validator.RequireMaxNoOfSameConsecutiveCharacters = _strengthOptions.RequireMaxNoOfSameConsecutiveCharacters;
            validator.MaxNoOfSameConsecutiveCharacters = _strengthOptions.MaximumNoOfSameConsecutiveCharacters;

            _validator = validator;

            TextChanged += (s, e) =>
            {
                var password = e.NewTextValue;

                if (string.IsNullOrEmpty(password))
                    _onValidation(password, false);

                var isValid = _validator.PasswordStrength(password);

                _onValidation(password, isValid);                
            };
        }
    }

    public class MyPasswordStrengthOptions
    {
        public int MinimumLength { get; set; } = 6;
        public bool RequireLowercase { get; set; } = true;
        public int MinimumLowercase { get; set; } = 1;
        public bool RequireDigit { get; set; } = true;
        public int MinimumDigit { get; set; } = 1;
        public bool RequireSpecialCharacter { get; set; } = true;
        public int MinimumSpecialCharacter { get; set; } = 1;
        public string SpecialCharacters { get; set; } = "@$!%*?&";
        public bool RequireUppercase { get; set; } = true;
        public int MinimumUppercase { get; set; } = 1;
        public bool RequireMaxNoOfSameConsecutiveCharacters { get; set; } = true;
        public int MaximumNoOfSameConsecutiveCharacters { get; set; } = 2;
    }
}