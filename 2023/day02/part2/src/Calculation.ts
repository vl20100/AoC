import { readFileSync } from "fs";
import { join } from "path";
import Game from "./Game";
import Set from "./Set";

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
                sum = this.calculateGame(line, sum);
            }
        });

        return sum;
    }

    calculateGame(line: string, sum: number): number {
        let game = new Game();
        game.number = this.getGameNumber(line);

        game.sets = this.getGameSets(line);

        //console.log(game.getMultiplied());

        sum += game.getMultiplied();

        return sum;
    }

    getGameNumber(line: string): number {
        let number = line.match(/\d+/);

        return number !== null ? Number(number[0]) : -1;
    }

    getGameSets(line: string): Array<Set> {
        let parts = this.getGameParts(line);
        let sets: Array<Set> = [];

        for (let part of parts) {
            sets.push(this.getPartSets(part));
        }

        return sets;
    }

    getGameParts(line: string): Array<string> {
        // Remove game number
        line = line.split(':')[1];

        return line.split(';');
    }

    getPartSets(part: string): Set {
        let sets = part.split(',');
        let result = new Set();

        for (let set of sets) {
            if (set.match(/blue/)) {
                let nb = set.match(/\d+/);

                if (nb !== null) {
                    result.blue = Number(nb);
                }
            } else if (set.match(/green/)) {
                let nb = set.match(/\d+/);

                if (nb !== null) {
                    result.green = Number(nb);
                }
            } else if (set.match(/red/)) {
                let nb = set.match(/\d+/);

                if (nb !== null) {
                    result.red = Number(nb);
                }
            }
        }

        return result;
    }
}
