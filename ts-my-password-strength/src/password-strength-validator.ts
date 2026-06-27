export class PasswordStrengthValidator {
    private _bangla:string = "\\u0980-\\u09FF";
    private _hindi:string = "\\u0900-\\u097F";
    private _punjabi:string = "\\u0A05-\\u0A14\\u0A15-\\u0A39";
    private _chinese:string = "\\u4E00-\\u9FFF";
    private _korean:string = "\\u1100-\\u11FF\\u3130-\\u318F\\uAC00-\\uD7A3";
    private _japanese:string = "\\u3040-\\u309F\\u30A0-\\u30FF\\u31F0-\\u31FF\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFAFF";
    private _urdu:string = "\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF";
    private _arabic:string = "\\u0621-\\u063A\\u0641-\\u064A";
    private _hebrew:string = "\\u05D0-\\u05EA";

    private _regexPattern: string|null = null;

    minimumLength: number = 6;
    requireUppercase: boolean = true;
    minimumUppercase: number = 1;
    requireLowercase: boolean = true;
    minimumLowercase: number = 1;
    requireSpecialCharacter: boolean = true;
    minimumSpecialCharacter: number = 1;
    specialCharacters: string = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;
    requireDigit: boolean = true;
    minimumDigit: number = 1;
    requireMaxNoOfSameConsecutiveCharacters: boolean = true
    maximumNoOfSameConsecutiveCharacters: number = 2;
    requireMaxNoOfConsecutiveAscendingDigits: boolean = true;
    maximumNoOfConsecutiveAscendingDigits: MaxNoOfConsecutiveDigits = MaxNoOfConsecutiveDigits.Two;
    requireMaxNoOfConsecutiveDescendingDigits: boolean = true;
    maximumNoOfConsecutiveDescendingDigits: MaxNoOfConsecutiveDigits = MaxNoOfConsecutiveDigits.Two;
    requireMaxNoOfConsecutiveAscendingCharacters: boolean = true;
    maxNoOfConsecutiveAscendingCharacters: MaxNoOfConsecutiveCharacters = MaxNoOfConsecutiveCharacters.Two;
    requireMaxNoOfConsecutiveDescendingCharacters: boolean = true;
    maxNoOfConsecutiveDescendingCharacters: MaxNoOfConsecutiveCharacters = MaxNoOfConsecutiveCharacters.Two;
    requireRepeatingSequenceCheck: boolean = true;
    minLengthOfRepeatingSequence: number = 2;
    language: Language = Language.English;    

    getRegexPattern (minLength: number, upper: boolean, minUpper: number, 
                    lower: boolean, minLower: number,  special: boolean, minSpecialCharacter: number, specialCharacters: string,
                    digit: boolean, minDigit: number, requireMaxNoOfSameConsecutiveCharacters: boolean, maxNoOfSameConsecutiveCharacters: number,
                    requireMaxNoOfConsecutiveAscendingDigits: boolean, maxNoOfConsecutiveAscendingDigits: MaxNoOfConsecutiveDigits,
                    requireMaxNoOfConsecutiveDescendingDigits: boolean, maxNoOfConsecutiveDescendingDigits: MaxNoOfConsecutiveDigits,
                    requireMaxNoOfConsecutiveAscendingCharacters: boolean, maxNoOfConsecutiveAscendingCharacters: MaxNoOfConsecutiveCharacters,
                    requireMaxNoOfConsecutiveDescendingCharacters: boolean, maxNoOfConsecutiveDescendingCharacters: MaxNoOfConsecutiveCharacters,
                    requireRepeatingSequenceCheck: boolean, minLengthOfRepeatingSequence: number): string {
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
            pattern += "(?!^(.*?(" + this.getMaxConsecutiveAscendingDigitsPattern(<number>maxNoOfConsecutiveAscendingDigits + 1) + "))+)"; // Max no of consecutive ascending digits
        if (requireMaxNoOfConsecutiveDescendingDigits)
            pattern += "(?!^(.*?(" + this.getMaxConsecutiveDescendingDigitsPattern(<number>maxNoOfConsecutiveDescendingDigits + 1) + "))+)"; // Max no of consecutive descending digits
        if (requireMaxNoOfConsecutiveAscendingCharacters)
            pattern += "(?!^(.*?(" + this.getMaxConsecutiveCharactersPattern(<number>maxNoOfConsecutiveAscendingCharacters + 1) + "))+)"; // Max no of consecutive ascending characters
        if (requireMaxNoOfConsecutiveDescendingCharacters)
            pattern += "(?!^(.*?(" + this.getMaxConsecutiveCharactersPattern(<number>maxNoOfConsecutiveDescendingCharacters + 1, true) + "))+)"; // Max no of consecutive descending characters
        if (requireRepeatingSequenceCheck)
            pattern += "(?!^(.*?(?<repeating>.{" + minLengthOfRepeatingSequence + ",})(?=(.*?\\k<repeating>)))+)"; // Repeating sequence
        pattern += ".{" + minLength + ",}$"; // Minimum length
        return pattern;         
    }

    passwordStrength(password: string): boolean {
        if (!password) {
            return false;
        }

        if (this._regexPattern == null) {
            this._regexPattern = this.getRegexPattern(this.minimumLength, this.requireUppercase, this.minimumUppercase,
                this.requireLowercase, this.minimumLowercase, this.requireSpecialCharacter, this.minimumSpecialCharacter, this.specialCharacters,
                this.requireDigit, this.minimumDigit, this.requireMaxNoOfSameConsecutiveCharacters, this.maximumNoOfSameConsecutiveCharacters,
                this.requireMaxNoOfConsecutiveAscendingDigits, this.maximumNoOfConsecutiveAscendingDigits,
                this.requireMaxNoOfConsecutiveDescendingDigits, this.maximumNoOfConsecutiveDescendingDigits,
                this.requireMaxNoOfConsecutiveAscendingCharacters, this.maxNoOfConsecutiveAscendingCharacters,
                this.requireMaxNoOfConsecutiveDescendingCharacters, this.maxNoOfConsecutiveDescendingCharacters,
                this.requireRepeatingSequenceCheck, this.minLengthOfRepeatingSequence);
        }

        console.log(this._regexPattern);
        
        const regex = new RegExp(this._regexPattern);

        return regex.test(password);
    }

    private getMaxConsecutiveAscendingDigitsPattern(length: number): string {
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
    
    private getMaxConsecutiveDescendingDigitsPattern(length: number): string {
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

    private replaceLanguage (language: Language, theString:string) : string {
        switch (language)
        {
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

    private convertUnicodeToHexNumber(hexStr: string): number {
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

    public getStartEndList(language: string): string[][] {
        var result:string[][] = [];

        var pattern = /\\u(?<start>[0-9A-Fa-f]{4})-\\u(?<end>[0-9A-Fa-f]{4})/g;
        var regex = new RegExp(pattern);

        const results = [...language.matchAll(regex)].map(m => m.groups);

        results.map(x => result.push([x!.start, x!.end ]));

        return result;
    }

    private getStartEnd(language: Language): string[][]{
        switch(language)
        {
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
                var arr:string[][] = [];
                arr.push(["A", "Z"]);
                return arr;
        };
    }

    private getMaxConsecutiveCharactersPattern(length: number, isDescending: boolean = false): string {
        if (!Number.isInteger(length) || length <= 0 || length > 26) {
            return "";
        }
    
        const patterns: string[] = [];
        if (this.language == Language.English) {
            if (!isDescending) {
                // A → Z
                for (let start = 0; start <= 26 - length; start++) {
                    const letters: string[] = [];
                    for (let i = 0; i < length; i++) {
                        letters.push(String.fromCharCode(65 + start + i));
                    }
                    patterns.push(this.buildVariants(letters));
                }
            } else {
                // Z → A
                for (let start = 26 - 1; start >= length - 1; start--) {
                    const letters: string[] = [];
                    for (let i = 0; i < length; i++) {
                        letters.push(String.fromCharCode(65 + start - i));
                    }
                    patterns.push(this.buildVariants(letters));
                }
            }
        }
        else {
            let startEndCharsList:string[][] = [];

            switch (this.language)
            {
                case Language.Bangla:
                    startEndCharsList = this.getStartEnd(Language.Bangla);
                    break;
                case Language.Hindi:
                    startEndCharsList = this.getStartEnd(Language.Hindi);
                    break;
                case Language.Punjabi:
                    startEndCharsList = this.getStartEnd(Language.Punjabi);
                    break;
                case Language.Chinese:
                    startEndCharsList = this.getStartEnd(Language.Chinese);
                    break;
                case Language.Korean:
                    startEndCharsList = this.getStartEnd(Language.Korean);
                    break;
                case Language.Japanese:
                    startEndCharsList = this.getStartEnd(Language.Japanese);
                    break;
                case Language.Urdu:
                    startEndCharsList = this.getStartEnd(Language.Urdu);
                    break;
                case Language.Arabic:
                    startEndCharsList = this.getStartEnd(Language.Arabic);
                    break;
                case Language.Hebrew:
                    startEndCharsList = this.getStartEnd(Language.Hebrew);
                    break;
            }

            let range:number[] = 
            startEndCharsList.map(x => [{ Start: this.convertUnicodeToHexNumber(x[0]), End: this.convertUnicodeToHexNumber(x[1]) }])
                             .reduce((acc, val) => acc.concat(val[0].Start, val[0].End), [] as number[]);          

            if (!isDescending) {
                // A → Z     
                for (let start = range[0]; start <= range[range.length - 1] - length; start++) {
                    const letters: string[] = [];
                    for (let i = 0; i < length; i++) {
                        letters.push(String.fromCodePoint(start + i));
                    }
                    patterns.push(this.buildMultilingualVariants(letters));
                }
            } else {
                // Z → A
                for (let start = range[range.length - 1] - 1; start >= range[0] - 1; start--) {
                    const letters: string[] = [];
                    for (let i = 0; i < length; i++) {
                        letters.push(String.fromCodePoint(start - i));
                    }
                    patterns.push(this.buildMultilingualVariants(letters));
                }
            }
        }    
        
        return patterns.join("|");
    }
    
    private buildVariants(letters: string[]): string {
        const upperLower = letters.map(ch => `(${ch}|${ch.toLowerCase()})`).join("");
        const lowerUpper = letters.map(ch => `(${ch.toLowerCase()}|${ch})`).join("");
        return `${upperLower}|${lowerUpper}`;
    }

    private buildMultilingualVariants(letters: string[]): string {
        const l = letters.map(ch => `${ch}`).join("");
        return `${l}`;
    }

    private generateIncreasingNumbers(start: number, length: number): number[] {
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

    private generateDecreasingNumbers(start: number, length: number): number[] {
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

export enum MaxNoOfConsecutiveDigits {
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5
}

export enum MaxNoOfConsecutiveCharacters {
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5
}

export enum Language
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