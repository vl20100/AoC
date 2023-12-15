"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const Game_1 = __importDefault(require("./Game"));
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
                let g = new Game_1.default(line);
                sum += g.getSum();
            }
        });
        return sum;
    }
}
exports.default = Calculation;
