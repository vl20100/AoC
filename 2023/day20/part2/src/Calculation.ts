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
            if (line !== '') {
                
            }
        });

        return sum;
    }
}
