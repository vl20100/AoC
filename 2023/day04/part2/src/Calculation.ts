import { readFileSync } from "fs";
import { join } from "path";
import Game from "./Game";

export default class Calculation {
    filename: string;
    filecontent: string = '';
    games: Array<Game> = [];

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
                let g = new Game(line);
                this.games.push(g);
            }
        });

        this.games.forEach((game) => {

            this.games = game.getSum(this.games);
            sum += game.sum;
        });

        return sum;
    }
}
