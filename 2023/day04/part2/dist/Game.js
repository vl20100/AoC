"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Game {
    id = '';
    number = -1;
    required = [];
    picked = [];
    nbFound = 0;
    sum = 0;
    constructor(line) {
        this.splitLine(line);
    }
    splitLine(line) {
        let tab = line.split(':');
        this.id = tab[0];
        this.number = this.getGameNumber();
        let numbers = tab[1].split('|');
        this.required = numbers[0].split(' ');
        this.picked = numbers[1].split(' ');
    }
    getGameNumber() {
        return Number(this.id.split(' ')[1]);
    }
    getSum(games) {
        if (this.nbFound === 0) {
            this.required.forEach((number) => {
                if (number.trim() !== '' && this.picked.indexOf(number) >= 0) {
                    this.nbFound++;
                }
            });
        }
        if (this.sum === 0) {
            this.sum = 1;
            for (let i = this.number; i < this.number + this.nbFound; i++) {
                if (typeof games[i] !== 'undefined') {
                    games = games[i].getSum(games);
                    this.sum += games[i].sum;
                }
            }
        }
        return games;
    }
}
exports.default = Game;
