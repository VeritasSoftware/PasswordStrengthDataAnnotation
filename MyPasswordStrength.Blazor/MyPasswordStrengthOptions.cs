namespace MyPasswordStrength.Blazor
{
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
        public bool RequireRepeatingSequenceCheck { get; set; } = true;
        public int MinimumLengthOfRepeatingSequence { get; set; } = 2;
        public Language Language { get; set; } = Language.English;
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

    public enum Language
    {
        English,
        Bangla,
        Hindi,
        Punjabi,
        Chinese,
        Korean,
        Japanese,
        Urdu,
        Arabic,
        Hebrew
    }
}
