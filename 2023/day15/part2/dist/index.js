"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Calculation_1 = __importDefault(require("./Calculation"));
let c = new Calculation_1.default('input.txt');
let sum = c.calculate();
console.log('Sum : ' + sum);
