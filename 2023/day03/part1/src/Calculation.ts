import { readFileSync } from "fs";
import { join } from "path";
import Engine from "./Engine";

export default class Calculation {
    filename: string;
    filecontent: string = '';
    engine: Engine = new Engine();

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

        tab.forEach((line) => {
            if (line !== '') {
                this.engine.addLine(line);
            }
        });

        this.engine.compileNumbers();

        let sum = 0;

        this.engine.numbers.forEach((number) => {
            if (number.isPart) {
                sum += number.value;
            }
        });

        return sum;
    }
}
