"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
class Calculation {
    filename;
    filecontent = '';
    engine = [];
    engineSizeX = 0;
    engineSizeY = 0;
    countedNumbers = [];
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
                this.addLineToEngine(line);
            }
        });
        this.engineSizeY = this.engine.length;
        this.engineSizeX = this.engine[0].length;
        return this.getSum();
    }
    addLineToEngine(line) {
        let chars = line.split('');
        this.engine.push(chars);
    }
    getSum() {
        let posX = 0, posY = 0;
        let isReadingNumber = false;
        let currentNumberPosY = 0, currentNumberStartPosX = 0, currentNumberEndPosX = 0;
        let sum = 0;
        for (posY = 0; posY < this.engineSizeY; posY++) {
            for (posX = 0; posX < this.engineSizeX; posX++) {
                if (isReadingNumber === false && this.engine[posY][posX].match(/\d/)) {
                    currentNumberStartPosX = posX;
                    currentNumberPosY = posY;
                    isReadingNumber = true;
                }
                else if (isReadingNumber === true && this.engine[posY][posX].match(/\d/) === null) {
                    isReadingNumber = false;
                    currentNumberEndPosX = posX - 1;
                    if (this.isPartNumber(currentNumberPosY, currentNumberStartPosX, currentNumberEndPosX)) {
                        let nb = this.getFullNumber(currentNumberPosY, currentNumberStartPosX, currentNumberEndPosX);
                        if (this.countedNumbers.indexOf(nb) === -1) {
                            sum += nb;
                            this.countedNumbers.push(nb);
                        }
                    }
                }
                else if (isReadingNumber === true && posX === this.engineSizeX - 1) {
                    isReadingNumber = false;
                    currentNumberEndPosX = posX;
                    if (this.isPartNumber(currentNumberPosY, currentNumberStartPosX, currentNumberEndPosX)) {
                        let nb = this.getFullNumber(currentNumberPosY, currentNumberStartPosX, currentNumberEndPosX);
                        if (this.countedNumbers.indexOf(nb) === -1) {
                            sum += nb;
                            this.countedNumbers.push(nb);
                        }
                    }
                }
            }
        }
        return sum;
    }
    isPartNumber(currentNumberPosY, currentNumberStartPosX, currentNumberEndPosX) {
        let minX = currentNumberStartPosX === 0 ? currentNumberStartPosX : (currentNumberStartPosX - 1);
        let maxX = currentNumberEndPosX === this.engineSizeX ? currentNumberEndPosX : (currentNumberEndPosX + 1);
        let minY = currentNumberPosY === 0 ? currentNumberPosY : (currentNumberPosY - 1);
        let maxY = currentNumberPosY === (this.engineSizeY - 1) ? currentNumberPosY : (currentNumberPosY + 1);
        let isValid = false;
        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x < maxX; x++) {
                let char = this.engine[y][x];
                if (typeof char !== 'undefined' && char.match(/\d|\./) === null) {
                    isValid = true;
                }
            }
        }
        return isValid;
    }
    getFullNumber(currentNumberPosY, currentNumberStartPosX, currentNumberEndPosX) {
        let str = '';
        for (let x = currentNumberStartPosX; x <= currentNumberEndPosX; x++) {
            str += this.engine[currentNumberPosY][x];
        }
        return Number(str);
    }
}
exports.default = Calculation;
