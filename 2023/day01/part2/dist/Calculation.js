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
            if (line !== '') {
                number = Number(this.getNumber(line));
            }
            sum += number;
        });
        return sum;
    }
    getNumber(line) {
        let match = [...line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)];
        let firstDigit = '0';
        let lastDigit = '0';
        if (match !== null) {
            match.forEach((item) => {
                if (firstDigit === '0') {
                    firstDigit = this.getDigit(item[1]);
                }
                lastDigit = this.getDigit(item[1]);
            });
        }
        return firstDigit + lastDigit;
    }
    getDigit(txt) {
        if (txt.match(/\d/)) {
            return txt;
        }
        else {
            switch (txt) {
                case 'one':
                    return '1';
                case 'two':
                    return '2';
                case 'three':
                    return '3';
                case 'four':
                    return '4';
                case 'five':
                    return '5';
                case 'six':
                    return '6';
                case 'seven':
                    return '7';
                case 'eight':
                    return '8';
                case 'nine':
                    return '9';
            }
        }
        return '0';
    }
}
exports.default = Calculation;
