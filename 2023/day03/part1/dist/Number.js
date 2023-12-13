"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Number {
    value = 0;
    isPart = false;
    lineIndex = -1;
    firstIndex = -1;
    lastIndex = -1;
    searchFirstIndex = -1;
    searchLastIndex = -1;
    constructor(value) {
        this.value = value;
    }
    setFirstIndex(index) {
        this.firstIndex = index;
        this.lastIndex = index + (this.value.toString().length - 1);
    }
    guessIsPart(previousLine, line, nextLine) {
        this.setSearchIndexes(line);
        this.isPart = (previousLine !== null && this.stringContainsSpecialChars(previousLine.slice(this.searchFirstIndex, this.searchLastIndex + 1).join(''))) ||
            this.stringContainsSpecialChars(line.slice(this.searchFirstIndex, this.searchLastIndex + 1).join('')) ||
            (nextLine !== null && this.stringContainsSpecialChars(nextLine.slice(this.searchFirstIndex, this.searchLastIndex + 1).join('')));
    }
    setSearchIndexes(line) {
        this.searchFirstIndex = this.firstIndex === 0 ? 0 : (this.firstIndex - 1);
        this.searchLastIndex = this.lastIndex === line.length - 1 ? this.lastIndex : (this.lastIndex + 1);
    }
    stringContainsSpecialChars(str) {
        let match = str.match(/[^\d\.]+/);
        return match !== null;
    }
}
exports.default = Number;
