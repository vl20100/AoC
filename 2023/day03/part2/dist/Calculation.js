"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const Engine_1 = __importDefault(require("./Engine"));
class Calculation {
    filename;
    filecontent = '';
    engine = new Engine_1.default();
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
        tab.forEach((line) => {
            if (line !== '') {
                this.engine.addLine(line);
            }
        });
        this.engine.compileGears();
        let sum = 0;
        this.engine.gears.forEach((gear) => {
            if (gear.isPart) {
                sum += gear.sum;
            }
        });
        return sum;
    }
}
exports.default = Calculation;
