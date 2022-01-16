#!/usr/bin/env ts-node

import { input } from "./input";

let countOfIncreases = 0;
const inputSize = input.length;

const getWindowSum = (i: number) => input.slice(i - 2, i + 1).reduce((a, b) => a + b);

for(let i = 2; i < inputSize - 1; i++) {
    countOfIncreases += getWindowSum(i + 1) > getWindowSum(i) ? 1 : 0; 
}

console.log(countOfIncreases);