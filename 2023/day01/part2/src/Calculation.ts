import { readFileSync } from "fs";
import { join } from "path";

export default class Calculation {
    filename: string;
    filecontent: string = '';

    constructor(filename: string) {
        this.filename = filename;

        this.getFileContent();
    }

    getFileContent() {
        let filePath = '../ext/' + this.filename;
        this.filecontent = readFileSync(join(__dirname, filePath), 'utf-8');
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

    getNumber(line: string): string {
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

    getDigit(txt: string): string {
        if (txt.match(/\d/)) {
            return txt;
        } else {
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
