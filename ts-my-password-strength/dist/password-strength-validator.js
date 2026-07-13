"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = exports.MaxNoOfConsecutiveCharacters = exports.MaxNoOfConsecutiveDigits = exports.PasswordStrengthValidator = void 0;
class PasswordStrengthValidator {
    constructor() {
        this._bangla = "\\u0980-\\u09FF";
        this._hindi = "\\u0900-\\u097F";
        this._punjabi = "\\u0A05-\\u0A14\\u0A15-\\u0A39";
        this._chinese = "\\u4E00-\\u9FFF";
        this._korean = "\\u1100-\\u11FF\\u3130-\\u318F\\uAC00-\\uD7A3";
        this._japanese = "\\u3040-\\u309F\\u30A0-\\u30FF\\u31F0-\\u31FF\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFAFF";
        this._urdu = "\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF";
        this._arabic = "\\u0621-\\u063A\\u0641-\\u064A";
        this._hebrew = "\\u05D0-\\u05EA";
        this._regexPattern = null;
        this.minimumLength = 6;
        this.requireUppercase = true;
        this.minimumUppercase = 1;
        this.requireLowercase = true;
        this.minimumLowercase = 1;
        this.requireSpecialCharacter = true;
        this.minimumSpecialCharacter = 1;
        this.specialCharacters = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;
        this.requireDigit = true;
        this.minimumDigit = 1;
        this.requireMaxNoOfSameConsecutiveCharacters = true;
        this.maximumNoOfSameConsecutiveCharacters = 2;
        this.requireMaxNoOfConsecutiveAscendingDigits = true;
        this.maximumNoOfConsecutiveAscendingDigits = MaxNoOfConsecutiveDigits.Two;
        this.requireMaxNoOfConsecutiveDescendingDigits = true;
        this.maximumNoOfConsecutiveDescendingDigits = MaxNoOfConsecutiveDigits.Two;
        this.requireMaxNoOfConsecutiveAscendingCharacters = true;
        this.maxNoOfConsecutiveAscendingCharacters = MaxNoOfConsecutiveCharacters.Two;
        this.requireMaxNoOfConsecutiveDescendingCharacters = true;
        this.maxNoOfConsecutiveDescendingCharacters = MaxNoOfConsecutiveCharacters.Two;
        this.requireRepeatingSequenceCheck = true;
        this.minLengthOfRepeatingSequence = 2;
        this.language = Language.English;
    }
    getRegexPattern(minLength, upper, minUpper, lower, minLower, special, minSpecialCharacter, specialCharacters, digit, minDigit, requireMaxNoOfSameConsecutiveCharacters, maxNoOfSameConsecutiveCharacters, requireMaxNoOfConsecutiveAscendingDigits, maxNoOfConsecutiveAscendingDigits, requireMaxNoOfConsecutiveDescendingDigits, maxNoOfConsecutiveDescendingDigits, requireMaxNoOfConsecutiveAscendingCharacters, maxNoOfConsecutiveAscendingCharacters, requireMaxNoOfConsecutiveDescendingCharacters, maxNoOfConsecutiveDescendingCharacters, requireRepeatingSequenceCheck, minLengthOfRepeatingSequence) {
        let pattern = "^";
        if (upper)
            pattern += this.replaceLanguage(this.language, "(?=(.*?[A-Z]){") + minUpper + ",})"; // min no of uppercase letter
        if (lower && this.language == Language.English)
            pattern += "(?=(.*?[a-z]){" + minLower + ",})"; // min no of lowercase letter
        if (digit)
            pattern += "(?=(.*?\\d){" + minDigit + ",})"; // min no of digit
        if (special)
            pattern += "(?=(.*?[" + specialCharacters + "]){" + minSpecialCharacter + ",})"; // min no of special character
        if (requireMaxNoOfSameConsecutiveCharacters)
            pattern += "(?=^((?<currentChar>.)(?!\\k<currentChar>{" + maxNoOfSameConsecutiveCharacters + "}))+$)"; //max no of same consecutive characters
        if (requireMaxNoOfConsecutiveAscendingDigits)
            pattern += "(?!^(.*?(" + this.getMaxConsecutiveAscendingDigitsPattern(maxNoOfConsecutiveAscendingDigits + 1) + "))+)"; // Max no of consecutive ascending digits
        if (requireMaxNoOfConsecutiveDescendingDigits)
            pattern += "(?!^(.*?(" + this.getMaxConsecutiveDescendingDigitsPattern(maxNoOfConsecutiveDescendingDigits + 1) + "))+)"; // Max no of consecutive descending digits
        if (requireMaxNoOfConsecutiveAscendingCharacters)
            pattern += "(?!^(.*?(" + this.getMaxConsecutiveCharactersPattern(maxNoOfConsecutiveAscendingCharacters + 1) + "))+)"; // Max no of consecutive ascending characters
        if (requireMaxNoOfConsecutiveDescendingCharacters)
            pattern += "(?!^(.*?(" + this.getMaxConsecutiveCharactersPattern(maxNoOfConsecutiveDescendingCharacters + 1, true) + "))+)"; // Max no of consecutive descending characters
        if (requireRepeatingSequenceCheck)
            pattern += "(?!^(.*?(?<repeating>.{" + minLengthOfRepeatingSequence + ",})(?=(.*?\\k<repeating>)))+)"; // Repeating sequence
        pattern += ".{" + minLength + ",}$"; // Minimum length
        return pattern;
    }
    passwordStrength(password) {
        if (!password) {
            return false;
        }
        if (this._regexPattern == null) {
            this._regexPattern = this.getRegexPattern(this.minimumLength, this.requireUppercase, this.minimumUppercase, this.requireLowercase, this.minimumLowercase, this.requireSpecialCharacter, this.minimumSpecialCharacter, this.specialCharacters, this.requireDigit, this.minimumDigit, this.requireMaxNoOfSameConsecutiveCharacters, this.maximumNoOfSameConsecutiveCharacters, this.requireMaxNoOfConsecutiveAscendingDigits, this.maximumNoOfConsecutiveAscendingDigits, this.requireMaxNoOfConsecutiveDescendingDigits, this.maximumNoOfConsecutiveDescendingDigits, this.requireMaxNoOfConsecutiveAscendingCharacters, this.maxNoOfConsecutiveAscendingCharacters, this.requireMaxNoOfConsecutiveDescendingCharacters, this.maxNoOfConsecutiveDescendingCharacters, this.requireRepeatingSequenceCheck, this.minLengthOfRepeatingSequence);
        }
        console.log(this._regexPattern);
        const regex = new RegExp(this._regexPattern);
        return regex.test(password);
    }
    getMaxConsecutiveAscendingDigitsPattern(length) {
        var numbers = this.generateIncreasingNumbers(0, 10); // Generate numbers from 0 to 9
        var patterns = numbers.map(num => {
            let pattern = "";
            for (let i = 0; i < length; i++) {
                pattern += (num + i) % 10; // Wrap around using modulo
            }
            return pattern;
        });
        return patterns.join("|"); // Join all patterns with OR operator
    }
    getMaxConsecutiveDescendingDigitsPattern(length) {
        var numbers = this.generateDecreasingNumbers(9, 10); // Generate numbers from 9 to 0
        var patterns = numbers.map(num => {
            let pattern = "";
            for (let i = 0; i < length; i++) {
                pattern += (num - i + 10) % 10; // Wrap around using modulo
            }
            return pattern;
        });
        return patterns.join("|"); // Join all patterns with OR operator
    }
    replaceLanguage(language, theString) {
        switch (language) {
            case Language.Bangla: return theString.replace("A-Z", this._bangla.replace(/\\u/g, "\\u"));
            case Language.Hindi: return theString.replace("A-Z", this._hindi.replace(/\\u/g, "\\u"));
            case Language.Punjabi: return theString.replace("A-Z", this._punjabi.replace(/\\u/g, "\\u"));
            case Language.Chinese: return theString.replace("A-Z", this._chinese.replace(/\\u/g, "\\u"));
            case Language.Korean: return theString.replace("A-Z", this._korean.replace(/\\u/g, "\\u"));
            case Language.Japanese: return theString.replace("A-Z", this._japanese.replace(/\\u/g, "\\u"));
            case Language.Urdu: return theString.replace("A-Z", this._urdu.replace(/\\u/g, "\\u"));
            case Language.Arabic: return theString.replace("A-Z", this._arabic.replace(/\\u/g, "\\u"));
            case Language.Hebrew: return theString.replace("A-Z", this._hebrew.replace(/\\u/g, "\\u"));
            default: return theString;
        }
    }
    convertUnicodeToHexNumber(hexStr) {
        // Validate hex string
        if (!/^[0-9A-Fa-f]+$/.test(hexStr)) {
            throw new Error("Invalid hex string for Unicode code point");
        }
        // Convert hex string to number
        const codePoint = parseInt(hexStr, 16);
        // Validate Unicode range
        if (codePoint < 0 || codePoint > 0x10FFFF) {
            throw new RangeError("Code point out of Unicode range");
        }
        return codePoint;
    }
    getStartEndList(language) {
        var result = [];
        var pattern = /\\u(?<start>[0-9A-Fa-f]{4})-\\u(?<end>[0-9A-Fa-f]{4})/g;
        var regex = new RegExp(pattern);
        const results = [...language.matchAll(regex)].map(m => m.groups);
        results.map(x => result.push([x.start, x.end]));
        return result;
    }
    getStartEnd(language) {
        switch (language) {
            case Language.Bangla:
                return this.getStartEndList(this._bangla);
            case Language.Hindi:
                return this.getStartEndList(this._hindi);
            case Language.Punjabi:
                return this.getStartEndList(this._punjabi);
            case Language.Chinese:
                return this.getStartEndList(this._chinese);
            case Language.Korean:
                return this.getStartEndList(this._korean);
            case Language.Japanese:
                return this.getStartEndList(this._japanese);
            case Language.Urdu:
                return this.getStartEndList(this._urdu);
            case Language.Arabic:
                return this.getStartEndList(this._arabic);
            case Language.Hebrew:
                return this.getStartEndList(this._hebrew);
            default:
                var arr = [];
                arr.push(["A", "Z"]);
                return arr;
        }
        ;
    }
    getMaxConsecutiveCharactersPattern(length, isDescending = false) {
        if (!Number.isInteger(length) || length <= 0 || length > 26) {
            return "";
        }
        const patterns = [];
        if (this.language == Language.English) {
            if (!isDescending) {
                // A → Z
                for (let start = 0; start <= 26 - length; start++) {
                    const letters = [];
                    for (let i = 0; i < length; i++) {
                        letters.push(String.fromCharCode(65 + start + i));
                    }
                    patterns.push(this.buildVariants(letters));
                }
            }
            else {
                // Z → A
                for (let start = 26 - 1; start >= length - 1; start--) {
                    const letters = [];
                    for (let i = 0; i < length; i++) {
                        letters.push(String.fromCharCode(65 + start - i));
                    }
                    patterns.push(this.buildVariants(letters));
                }
            }
        }
        else {
            let startEndCharsList = this.getStartEnd(this.language);
            ;
            let range = startEndCharsList.map(x => [{ Start: this.convertUnicodeToHexNumber(x[0]), End: this.convertUnicodeToHexNumber(x[1]) }])
                .reduce((acc, val) => acc.concat(val[0].Start, val[0].End), []);
            if (!isDescending) {
                // A → Z     
                for (let start = range[0]; start <= range[range.length - 1] - length; start++) {
                    const letters = [];
                    for (let i = 0; i < length; i++) {
                        letters.push(String.fromCodePoint(start + i));
                    }
                    patterns.push(this.buildMultilingualVariants(letters));
                }
            }
            else {
                // Z → A
                for (let start = range[range.length - 1] - 1; start >= range[0] - 1; start--) {
                    const letters = [];
                    for (let i = 0; i < length; i++) {
                        letters.push(String.fromCodePoint(start - i));
                    }
                    patterns.push(this.buildMultilingualVariants(letters));
                }
            }
        }
        return patterns.join("|");
    }
    buildVariants(letters) {
        const upperLower = letters.map(ch => `(${ch}|${ch.toLowerCase()})`).join("");
        const lowerUpper = letters.map(ch => `(${ch.toLowerCase()}|${ch})`).join("");
        return `${upperLower}|${lowerUpper}`;
    }
    buildMultilingualVariants(letters) {
        const l = letters.map(ch => `${ch}`).join("");
        return `${l}`;
    }
    generateIncreasingNumbers(start, length) {
        // Validate inputs
        if (typeof start !== 'number' || typeof length !== 'number') {
            throw new TypeError('Both start and length must be numbers.');
        }
        if (!Number.isInteger(length) || length < 0) {
            throw new RangeError('Length must be a non-negative integer.');
        }
        // Generate array using Array.from
        return Array.from({ length }, (_, index) => start + index);
    }
    generateDecreasingNumbers(start, length) {
        // Validate inputs
        if (typeof start !== 'number' || typeof length !== 'number') {
            throw new TypeError('Both start and length must be numbers.');
        }
        if (!Number.isInteger(length) || length < 0) {
            throw new RangeError('Length must be a non-negative integer.');
        }
        // Generate array using Array.from
        return Array.from({ length }, (_, index) => (start - index + 10) % 10); // Wrap around using modulo
    }
}
exports.PasswordStrengthValidator = PasswordStrengthValidator;
var MaxNoOfConsecutiveDigits;
(function (MaxNoOfConsecutiveDigits) {
    MaxNoOfConsecutiveDigits[MaxNoOfConsecutiveDigits["Two"] = 2] = "Two";
    MaxNoOfConsecutiveDigits[MaxNoOfConsecutiveDigits["Three"] = 3] = "Three";
    MaxNoOfConsecutiveDigits[MaxNoOfConsecutiveDigits["Four"] = 4] = "Four";
    MaxNoOfConsecutiveDigits[MaxNoOfConsecutiveDigits["Five"] = 5] = "Five";
})(MaxNoOfConsecutiveDigits || (exports.MaxNoOfConsecutiveDigits = MaxNoOfConsecutiveDigits = {}));
var MaxNoOfConsecutiveCharacters;
(function (MaxNoOfConsecutiveCharacters) {
    MaxNoOfConsecutiveCharacters[MaxNoOfConsecutiveCharacters["Two"] = 2] = "Two";
    MaxNoOfConsecutiveCharacters[MaxNoOfConsecutiveCharacters["Three"] = 3] = "Three";
    MaxNoOfConsecutiveCharacters[MaxNoOfConsecutiveCharacters["Four"] = 4] = "Four";
    MaxNoOfConsecutiveCharacters[MaxNoOfConsecutiveCharacters["Five"] = 5] = "Five";
})(MaxNoOfConsecutiveCharacters || (exports.MaxNoOfConsecutiveCharacters = MaxNoOfConsecutiveCharacters = {}));
var Language;
(function (Language) {
    Language[Language["English"] = 0] = "English";
    Language[Language["Bangla"] = 1] = "Bangla";
    Language[Language["Hindi"] = 2] = "Hindi";
    Language[Language["Punjabi"] = 3] = "Punjabi";
    Language[Language["Chinese"] = 4] = "Chinese";
    Language[Language["Korean"] = 5] = "Korean";
    Language[Language["Japanese"] = 6] = "Japanese";
    Language[Language["Urdu"] = 7] = "Urdu";
    Language[Language["Arabic"] = 8] = "Arabic";
    Language[Language["Hebrew"] = 9] = "Hebrew";
})(Language || (exports.Language = Language = {}));
