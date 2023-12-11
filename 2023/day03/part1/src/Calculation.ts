import { readFileSync } from "fs";
import { join } from "path";

export default class Calculation {
    filename: string;
    filecontent: string = '';
    engine: Array<Array<string>> = [];
    engineSizeX: number = 0;
    engineSizeY: number = 0;
    countedNumbers: Array<number> = [];

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

        tab.forEach((line) => {
            if (line !== '') {
                this.addLineToEngine(line);
            }
        });

        this.engineSizeY = this.engine.length;
        this.engineSizeX = this.engine[0].length;

        return this.getSum();
    }

    addLineToEngine(line: string) {
        let chars = line.split('');
        this.engine.push(chars);
    }
    
    getSum(): number {
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
                } else if (isReadingNumber === true && this.engine[posY][posX].match(/\d/) === null) {
                    isReadingNumber = false;
                    currentNumberEndPosX = posX;

                    if (this.isPartNumber(currentNumberPosY, currentNumberStartPosX, currentNumberEndPosX)) {
                        let nb = this.getFullNumber(currentNumberPosY, currentNumberStartPosX, currentNumberEndPosX)

                        if (this.countedNumbers.indexOf(nb) === -1) {
                            sum += nb;
                            this.countedNumbers.push(nb);
                        }
                    }
                } else if (isReadingNumber === true && posX === this.engineSizeX - 1) {
                    isReadingNumber = false;
                    currentNumberEndPosX = posX + 1;

                    if (this.isPartNumber(currentNumberPosY, currentNumberStartPosX, currentNumberEndPosX)) {
                        let nb = this.getFullNumber(currentNumberPosY, currentNumberStartPosX, currentNumberEndPosX)

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

    isPartNumber(currentNumberPosY: number, currentNumberStartPosX: number, currentNumberEndPosX: number): boolean {
        
        let minX = currentNumberStartPosX === 0 ? currentNumberStartPosX : (currentNumberStartPosX - 1);
        let maxX = currentNumberEndPosX === this.engineSizeX ? currentNumberEndPosX : (currentNumberEndPosX + 1);
        let minY = currentNumberPosY === 0 ? currentNumberPosY : (currentNumberPosY - 1);
        let maxY = currentNumberPosY === (this.engineSizeY - 1) ? currentNumberPosY : (currentNumberPosY + 1);

        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                let char = this.engine[y][x];

                if (typeof char !== 'undefined' && char.match(/\d|\./) === null) {
                    return true;
                }
            }
        }

        return false;
    }

    getFullNumber(currentNumberPosY: number, currentNumberStartPosX: number, currentNumberEndPosX: number): number {
        let str = '';

        for (let x = currentNumberStartPosX; x < currentNumberEndPosX; x++) {
            str += this.engine[currentNumberPosY][x];
        }

        return Number(str);
    }
}
