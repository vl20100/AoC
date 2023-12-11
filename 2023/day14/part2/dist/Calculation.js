"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const Game_1 = __importDefault(require("./Game"));
const Set_1 = __importDefault(require("./Set"));
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
            if (line !== '') {
                sum = this.calculateGame(line, sum);
            }
        });
        return sum;
    }
    calculateGame(line, sum) {
        let game = new Game_1.default();
        game.number = this.getGameNumber(line);
        game.sets = this.getGameSets(line);
        //console.log(game.getMultiplied());
        sum += game.getMultiplied();
        return sum;
    }
    getGameNumber(line) {
        let number = line.match(/\d+/);
        return number !== null ? Number(number[0]) : -1;
    }
    getGameSets(line) {
        let parts = this.getGameParts(line);
        let sets = [];
        for (let part of parts) {
            sets.push(this.getPartSets(part));
        }
        return sets;
    }
    getGameParts(line) {
        // Remove game number
        line = line.split(':')[1];
        return line.split(';');
    }
    getPartSets(part) {
        let sets = part.split(',');
        let result = new Set_1.default();
        for (let set of sets) {
            if (set.match(/blue/)) {
                let nb = set.match(/\d+/);
                if (nb !== null) {
                    result.blue = Number(nb);
                }
            }
            else if (set.match(/green/)) {
                let nb = set.match(/\d+/);
                if (nb !== null) {
                    result.green = Number(nb);
                }
            }
            else if (set.match(/red/)) {
                let nb = set.match(/\d+/);
                if (nb !== null) {
                    result.red = Number(nb);
                }
            }
        }
        return result;
    }
}
exports.default = Calculation;
