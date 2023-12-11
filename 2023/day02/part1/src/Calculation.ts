import { readFileSync } from "fs";
import { join } from "path";
import Maximum from "./Maximum";

export default class Calculation {
    filename: string;
    filecontent: string = '';
    max: Maximum;

    constructor(filename: string) {
        this.filename = filename;
        this.max = new Maximum();

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
                sum = this.checkGame(line, sum);
            }
        });

        return sum;
    }

    checkGame(line: string, sum: number): any {
        let gameNumber = this.getGameNumber(line);

        if (this.isGamePossible(line)) {
            sum += Number(gameNumber);
        }

        return sum;
    }

    getGameNumber(line: string): number {
        let number = line.match(/\d+/);

        return number !== null ? Number(number[0]) : -1;
    }

    isGamePossible(line: string): boolean {
        let parts = this.getGameParts(line);

        for (let part of parts) {

            if (this.veryfiIfPartIsValid(part) === false) {
                return false;
            }
        }

        return true;
    }

    getGameParts(line: string): Array<string> {
        // Remove game number
        line = line.split(':')[1];

        return line.split(';');
    }

    veryfiIfPartIsValid(part: string): boolean {
        let sets = part.split(',');

        for (let set of sets) {
            if (set.match(/blue/)) {

                let nb = set.match(/\d+/);

                if (nb !== null && Number(nb) > this.max.blue) {
                    return false;
                }

            } else if (set.match(/green/)) {

                let nb = set.match(/\d+/);

                if (nb !== null && Number(nb) > this.max.green) {
                    return false;
                }

            } else if (set.match(/red/)) {

                let nb = set.match(/\d+/);

                if (nb !== null && Number(nb) > this.max.red) {
                    return false;
                }
            }
        }

        return true;
    }
}
