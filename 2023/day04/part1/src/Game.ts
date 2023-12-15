export default class Game {
    id: string = '';
    required: Array<string> = [];
    picked: Array<string> = [];

    constructor(line: string) {
        this.splitLine(line);
    }

    splitLine(line: string) {
        let tab = line.split(':');
        this.id = tab[0];

        let numbers = tab[1].split('|');
        this.required = numbers[0].split(' ');
        this.picked = numbers[1].split(' ');
    }
    
    getSum() {
        let nbFound = 0;

        this.required.forEach((number) => {
            if (number.trim() !== '' && this.picked.indexOf(number) >= 0) {
                nbFound++;
            }
        });

        return nbFound === 0 ? nbFound : Math.pow(2, nbFound - 1);
    }
}
