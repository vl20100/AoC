export default class Number {
    value: number = 0;
    isPart: boolean = false;
    lineIndex: number = -1;
    private firstIndex: number = -1;
    private lastIndex: number = -1;
    private searchFirstIndex: number = -1;
    private searchLastIndex: number = -1;

    constructor(value: number) {
        this.value = value;
    }

    setFirstIndex(index: number) {
        this.firstIndex = index;
        this.lastIndex = index + (this.value.toString().length - 1);
    }

    guessIsPart(previousLine: Array<string> | null, line: Array<string>, nextLine: Array<string> | null) {
        this.setSearchIndexes(line);

        this.isPart = (previousLine !== null && this.stringContainsSpecialChars(previousLine.slice(this.searchFirstIndex, this.searchLastIndex + 1).join(''))) ||
            this.stringContainsSpecialChars(line.slice(this.searchFirstIndex, this.searchLastIndex + 1).join('')) || 
            (nextLine !== null && this.stringContainsSpecialChars(nextLine.slice(this.searchFirstIndex, this.searchLastIndex + 1).join('')));
    }

    private setSearchIndexes(line: string[]) {
        this.searchFirstIndex = this.firstIndex === 0 ? 0 : (this.firstIndex - 1);
        this.searchLastIndex = this.lastIndex === line.length - 1 ? this.lastIndex : (this.lastIndex + 1);
    }

    private stringContainsSpecialChars(str: string) {
        let match = str.match(/[^\d\.]+/);
        return match !== null;
    }
}
