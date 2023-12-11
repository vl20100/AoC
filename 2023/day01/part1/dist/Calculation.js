"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
class Calculation {
    filename;
    filecontent = '';
    constructor(filename) {
        this.filename = filename;
        this.getFileContent();
    }
    getFileContent() {
        let filePath = '../ext/' + this.filename;
        this.filecontent = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, filePath), 'utf-8');
    }
    calculate() {
        let tab = this.filecontent.split(/\r?\n/);
        let sum = 0;
        tab.forEach((line) => {
            let number = 0;
            let firstDigit = '0';
            let lastDigit = '0';
            if (line !== '') {
                firstDigit = this.getFirstDigit(line);
                lastDigit = this.getLastDigit(line);
            }
            number = Number(firstDigit) * 10 + Number(lastDigit);
            sum += number;
        });
        return sum;
    }
    getFirstDigit(line) {
        let match = line.match(/\d/);
        return match !== null ? match[0] : '0';
    }
    getLastDigit(line) {
        line = this.reverseString(line);
        let match = line.match(/\d/);
        return match !== null ? match[0] : '0';
    }
    reverseString(str) {
        return str.split('').reverse().join('');
    }
}
exports.default = Calculation;
