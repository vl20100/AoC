"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Gear_1 = __importDefault(require("./Gear"));
class Engine {
    content = [];
    gears = [];
    constructor() {
    }
    addLine(line) {
        this.content.push(line.split(''));
    }
    compileGears() {
        let contentLength = this.content.length;
        for (let i = 0; i < contentLength; i++) {
            this.getLineGears(i);
        }
    }
    getLineGears(lineIndex) {
        let strLine = this.content[lineIndex].join('');
        let gearsIndexes = [...strLine.matchAll(/\*/g)];
        if (gearsIndexes && gearsIndexes.length > 0) {
            for (let result of gearsIndexes) {
                let gear = new Gear_1.default();
                gear.lineIndex = lineIndex;
                gear.colIndex = (typeof result['index'] !== 'undefined' ? +result['index'] : -1);
                let previousLine = lineIndex === 0 ? null : this.content[lineIndex - 1];
                let line = this.content[lineIndex];
                let nextLine = lineIndex === this.content.length - 1 ? null : this.content[lineIndex + 1];
                gear.guessIsPart(previousLine, line, nextLine);
                this.gears.push(gear);
            }
        }
    }
}
exports.default = Engine;
