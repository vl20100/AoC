import Gear from "./Gear";

export default class Engine {
    content: Array<Array<string>> = [];
    gears: Array<Gear> = [];

    constructor() {

    }

    addLine(line: string) {
        this.content.push(line.split(''));
    }

    compileGears() {
        let contentLength = this.content.length;
        for (let i = 0; i < contentLength; i++) {
            this.getLineGears(i);
        }
    }

    getLineGears(lineIndex: number) {
        let strLine = this.content[lineIndex].join('');
        let gearsIndexes = [...strLine.matchAll(/\*/g)];

        if (gearsIndexes && gearsIndexes.length > 0) {
            for (let result of gearsIndexes) {
                let gear = new Gear();
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
