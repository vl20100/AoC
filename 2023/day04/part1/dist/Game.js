"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Game {
    id = '';
    required = [];
    picked = [];
    constructor(line) {
        this.splitLine(line);
    }
    splitLine(line) {
        let tab = line.split(':');
        this.id = tab[0];
        let numbers = tab[1].split('|');
        this.required = numbers[0].split(' ');
        this.picked = numbers[1].split(' ');
    }
    getSum() {
        let nbFound = 0;
        this.required.forEach((number) => {
            if (number.trim() !== '' && this.picked.indexOf(number) >= 0) {
                nbFound++;
            }
        });
        return nbFound === 0 ? nbFound : Math.pow(2, nbFound - 1);
    }
}
exports.default = Game;
