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

    getFirstDigit(line: string): string {
        let match = line.match(/\d/);
        return match !== null ? match[0] : '0';
    }

    getLastDigit(line: string): string {
        line = this.reverseString(line);
        let match = line.match(/\d/);
        return match !== null ? match[0] : '0';
    }

    reverseString(str: string): string {
        return str.split('').reverse().join('');
    }
}
