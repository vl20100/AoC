export default class Gear {
    lineIndex: number = -1;
    colIndex: number = -1;
    isPart: boolean = false;
    numbers: Array<number> = [];
    sum: number = 1;

    guessIsPart(previousLine: Array<string>|null, currentLine: Array<string>, nextLine: Array<string>|null) {
        let lineMaxIndex = currentLine.length - 1;
        let minSearchIndex: number = this.colIndex === 0 ? this.colIndex : this.colIndex - 1;
        let maxSearchIndex: number = this.colIndex === lineMaxIndex ? this.colIndex : this.colIndex + 1;

        let nbInPrevious = previousLine === null ? 0 : this.stringContainsNumber(previousLine.slice(minSearchIndex, maxSearchIndex + 1).join(''), previousLine, minSearchIndex, maxSearchIndex);
        let nbInLine = this.stringContainsNumber(currentLine.slice(minSearchIndex, maxSearchIndex + 1).join(''), currentLine, minSearchIndex, maxSearchIndex);
        let nbInNext = nextLine === null ? 0 : this.stringContainsNumber(nextLine.slice(minSearchIndex, maxSearchIndex + 1).join(''), nextLine, minSearchIndex, maxSearchIndex);

        this.isPart = (nbInPrevious + nbInLine + nbInNext) === 2;

        this.setSum();
    }

    private stringContainsNumber(str: string, fullLine: Array<string>, minIndex: number, maxIndex: number): number {

        let match = [...str.matchAll(/[\d]+/g)];

        if (match.length > 0) {
            if (match.length === 1) {
                this.getNumber(fullLine, minIndex, maxIndex);
            } else {
                let firstNumberMinIndex = minIndex;
                let firstNumberMaxIndex = minIndex + 1;
                let secondNumberMinIndex = maxIndex - 1;
                let secondNumberMaxIndex = maxIndex;

                this.getNumber(fullLine, firstNumberMinIndex, firstNumberMaxIndex);
                this.getNumber(fullLine, secondNumberMinIndex, secondNumberMaxIndex);
            }
        }

        return match.length;
    }

    private getNumber(line: Array<string>, minIndex: number, maxIndex: number) {
        if (line[minIndex].match(/\d/)) {
            while (typeof line[minIndex] !== 'undefined' && line[minIndex].match(/\d/)) {
                minIndex--;
            }
            if (minIndex < 0) {
                minIndex = 0;
            }
        }
        if (line[maxIndex].match(/\d/)) {
            while (typeof line[maxIndex] !== 'undefined' && line[maxIndex].match(/\d/)) {
                maxIndex++;
            }
        }

        let numberMatch = line.slice(minIndex, maxIndex + 1).join('').match(/\d+/);

        if (numberMatch !== null) {
            this.numbers.push(Number(numberMatch[0]));
        }
    }

    private setSum() {
        this.numbers.forEach((number) => this.sum *= number);

        if (this.sum === 1) {
            this.sum = 0;
        }
    }
}
