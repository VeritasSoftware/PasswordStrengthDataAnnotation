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
        private MyPasswordStrengthOptions _strengthOptions = new MyPasswordStrengthOptions();
        private PasswordStrengthValidator _validator = new PasswordStrengthValidator();
        private Action<string, bool> _onValidation = null!;

        public Action<string, bool> OnValidation
        {
            get => _onValidation;
            set
            {
                _onValidation = value;
                SetTextChangedDelegate();
            }
        }

        public MyPasswordStrengthOptions StrengthOptions
        {
            get
            {
                return _strengthOptions;
            }
            set
            {
                SetStrengthOptions(value);
            }
        }


        public PasswordStrengthEntry()
        {
            Keyboard = Keyboard.Password;
        }

        public PasswordStrengthEntry(Action<string, bool> onValidation, MyPasswordStrengthOptions? strengthOptions = null,
                                        string? placeholder = "Enter password") 
        {
            _onValidation = onValidation;
            StrengthOptions = strengthOptions ?? new MyPasswordStrengthOptions();

            Placeholder = placeholder;
            Keyboard = Keyboard.Password;

            InitializeComponent(StrengthOptions);
        }

        private void SetStrengthOptions(MyPasswordStrengthOptions options)
        {
            _strengthOptions = options;
            _validator.MinimumLength = options.MinimumLength;
            _validator.RequireUppercase = options.RequireUppercase;
            _validator.MinUppercase = options.MinimumUppercase;
            _validator.RequireLowercase = options.RequireLowercase;
            _validator.MinLowercase = options.MinimumLowercase;
            _validator.RequireDigit = options.RequireDigit;
            _validator.MinDigit = options.MinimumDigit;
            _validator.RequireSpecialCharacter = options.RequireSpecialCharacter;
            _validator.MinSpecialCharacter = options.MinimumSpecialCharacter;
            _validator.SpecialCharacters = options.SpecialCharacters;
            _validator.RequireMaxNoOfSameConsecutiveCharacters = options.RequireMaximumNoOfSameConsecutiveCharacters;
            _validator.MaxNoOfSameConsecutiveCharacters = options.MaximumNoOfSameConsecutiveCharacters;
            _validator.RequireMaxNoOfConsecutiveAscendingDigits = options.RequireMaximumNoOfConsecutiveAscendingDigits;
            _validator.MaxNoOfConsecutiveAscendingDigits = options.MaximumNoOfConsecutiveAscendingDigits;
            _validator.RequireMaxNoOfConsecutiveDescendingDigits = options.RequireMaximumNoOfConsecutiveDescendingDigits;
            _validator.MaxNoOfConsecutiveDescendingDigits = options.MaximumNoOfConsecutiveDescendingDigits;
            _validator.RequireMaxNoOfConsecutiveAscendingCharacters = options.RequireMaximumNoOfConsecutiveAscendingCharacters;
            _validator.MaxNoOfConsecutiveAscendingCharacters = options.MaximumNoOfConsecutiveAscendingCharacters;
            _validator.RequireMaxNoOfConsecutiveDescendingCharacters = options.RequireMaximumNoOfConsecutiveDescendingCharacters;
            _validator.MaxNoOfConsecutiveDescendingCharacters = options.MaximumNoOfConsecutiveDescendingCharacters;
        }

        private void SetTextChangedDelegate()
        {
            TextChanged += (s, e) =>
            {
                var password = e.NewTextValue;

                if (string.IsNullOrEmpty(password))
                {
                    _onValidation?.Invoke(password, false);
                    return;
                }

                var isValid = _validator.PasswordStrength(password);

                _onValidation?.Invoke(password, isValid);
            };
        }

        private void InitializeComponent(MyPasswordStrengthOptions options = null!)
        {
            SetStrengthOptions(options ?? new MyPasswordStrengthOptions());
            SetTextChangedDelegate();
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
        public string SpecialCharacters { get; set; } = @"!""#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
        public bool RequireUppercase { get; set; } = true;
        public int MinimumUppercase { get; set; } = 1;
        public bool RequireMaximumNoOfSameConsecutiveCharacters { get; set; } = true;
        public int MaximumNoOfSameConsecutiveCharacters { get; set; } = 2;
        public bool RequireMaximumNoOfConsecutiveAscendingDigits { get; set; } = true;
        public MaximumNoOfConsecutiveDigits MaximumNoOfConsecutiveAscendingDigits { get; set; } = MaximumNoOfConsecutiveDigits.Two;
        public bool RequireMaximumNoOfConsecutiveDescendingDigits { get; set; } = true;
        public MaximumNoOfConsecutiveDigits MaximumNoOfConsecutiveDescendingDigits { get; set; } = MaximumNoOfConsecutiveDigits.Two;
        public bool RequireMaximumNoOfConsecutiveAscendingCharacters { get; set; } = true;
        public MaximumNoOfConsecutiveCharacters MaximumNoOfConsecutiveAscendingCharacters { get; set; } = MaximumNoOfConsecutiveCharacters.Two;
        public bool RequireMaximumNoOfConsecutiveDescendingCharacters { get; set; } = true;
        public MaximumNoOfConsecutiveCharacters MaximumNoOfConsecutiveDescendingCharacters { get; set; } = MaximumNoOfConsecutiveCharacters.Two;
    }

    public enum MaximumNoOfConsecutiveDigits
    {
        Two = 2,
        Three = 3,
        Four = 4,
        Five = 5
    }

    public enum MaximumNoOfConsecutiveCharacters
    {
        Two = 2,
        Three = 3,
        Four = 4,
        Five = 5
    }
}