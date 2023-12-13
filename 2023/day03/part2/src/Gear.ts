export default class Gear {
    lineIndex: number = -1;
    colIndex: number = -1;
    isPart: boolean = false;
    value1: number = 0;
    value2: number = 0;
    sum: number = 0;

    guessIsPart(previousLine: Array<string>|null, currentLine: Array<string>, nextLine: Array<string>|null) {
        let lineMaxIndex = currentLine.length - 1;
        let minSearchIndex: number = this.colIndex === 0 ? this.colIndex : this.colIndex - 1;
        let maxSearchIndex: number = this.colIndex === lineMaxIndex ? this.colIndex : this.colIndex + 1;

        
    }
}