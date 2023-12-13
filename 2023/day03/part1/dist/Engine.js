"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Number_1 = __importDefault(require("./Number"));
class Engine {
    content = [];
    numbers = [];
    constructor() {
    }
    addLine(line) {
        this.content.push(line.split(''));
    }
    compileNumbers() {
        let contentLength = this.content.length;
        for (let i = 0; i < contentLength; i++) {
            this.getLineNumbers(i);
        }
    }
    getLineNumbers(lineIndex) {
        let strLine = this.content[lineIndex].join('');
        let numbersIndexes = [...strLine.matchAll(/\d+/g)];
        if (numbersIndexes && numbersIndexes.length > 0) {
            for (let result of numbersIndexes) {
                let number = new Number_1.default(+result[0]);
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
exports.default = Engine;
