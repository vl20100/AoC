import Number from "./Number";

export default class Engine {
    content: Array<Array<string>> = [];
    numbers: Array<Number> = [];

    constructor() {

    }

    addLine(line: string) {
        this.content.push(line.split(''));
    }

    compileNumbers() {
        let contentLength = this.content.length;
        for (let i = 0; i < contentLength; i++) {
            this.getLineNumbers(i);
        }
    }

    getLineNumbers(lineIndex: number) {
        let strLine = this.content[lineIndex].join('');
        let numbersIndexes = [...strLine.matchAll(/\d+/g)];

        if (numbersIndexes && numbersIndexes.length > 0) {
            for (let result of numbersIndexes) {
                let number = new Number(+result[0]);
                number.lineIndex = lineIndex;
                number.setFirstIndex(typeof result['index'] !== 'undefined' ? +result['index'] : -1);

                let previousLine = lineIndex === 0 ? null : this.content[lineIndex - 1];
                let line = this.content[lineIndex];
                let nextLine = lineIndex === this.content.length - 1 ? null : this.content[lineIndex + 1];
                number.guessIsPart(previousLine, line, nextLine);

                this.numbers.push(number);
            }
        }
    }
}
