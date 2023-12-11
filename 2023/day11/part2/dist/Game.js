"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Game {
    number = 0;
    sets = [];
    minRed = 0;
    minGreen = 0;
    minBlue = 0;
    getMultiplied() {
        for (let set of this.sets) {
            if ((this.minRed === 0 && set.red > 0) || (this.minRed > 0 && set.red > 0 && set.red > this.minRed)) {
                this.minRed = set.red;
            }
            if ((this.minGreen === 0 && set.green > 0) || (this.minGreen > 0 && set.green > 0 && set.green > this.minGreen)) {
                this.minGreen = set.green;
            }
            if ((this.minBlue === 0 && set.blue > 0) || (this.minBlue > 0 && set.blue > 0 && set.blue > this.minBlue)) {
                this.minBlue = set.blue;
            }
        }
        return this.minRed * this.minGreen * this.minBlue;
    }
}
exports.default = Game;
