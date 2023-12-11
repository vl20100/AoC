"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const Maximum_1 = __importDefault(require("./Maximum"));
class Calculation {
    filename;
    filecontent = '';
    max;
    constructor(filename) {
        this.filename = filename;
        this.max = new Maximum_1.default();
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
                sum = this.checkGame(line, sum);
            }
        });
        return sum;
    }
    checkGame(line, sum) {
        let gameNumber = this.getGameNumber(line);
        if (this.isGamePossible(line)) {
            sum += Number(gameNumber);
        }
        return sum;
    }
    getGameNumber(line) {
        let number = line.match(/\d+/);
        return number !== null ? Number(number[0]) : -1;
    }
    isGamePossible(line) {
        let parts = this.getGameParts(line);
        for (let part of parts) {
            if (this.veryfiIfPartIsValid(part) === false) {
                return false;
            }
        }
        return true;
    }
    getGameParts(line) {
        // Remove game number
        line = line.split(':')[1];
        return line.split(';');
    }
    veryfiIfPartIsValid(part) {
        let sets = part.split(',');
        for (let set of sets) {
            if (set.match(/blue/)) {
                let nb = set.match(/\d+/);
                if (nb !== null && Number(nb) > this.max.blue) {
                    return false;
                }
            }
            else if (set.match(/green/)) {
                let nb = set.match(/\d+/);
                if (nb !== null && Number(nb) > this.max.green) {
                    return false;
                }
            }
            else if (set.match(/red/)) {
                let nb = set.match(/\d+/);
                if (nb !== null && Number(nb) > this.max.red) {
                    return false;
                }
            }
        }
        return true;
    }
}
exports.default = Calculation;
