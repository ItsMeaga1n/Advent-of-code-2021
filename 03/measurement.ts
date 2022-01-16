#!/usr/bin/env ts-node

import { input } from "./input";

const inputLength = input[0].length;
let result = "";

for(let i=0; i < inputLength; i++) {
    let zeroCount = 0;
    for(let j = 0; j<input.length; j++) {
        zeroCount += input[j][i] === "0" ? 1 : -1;
    }
    if(zeroCount > 0) {
        result += "0";
    } else {
        result += "1";
    }
}
let gammaRate = 0;
let epsilonRate = 0;
console.log(result)
for(let i=inputLength; i > 0; i--) {
    gammaRate += parseInt(result[i - 1]) * Math.pow(2, inputLength - i);

    epsilonRate += (result[i - 1] === "0" ? 1 : 0) * Math.pow(2, inputLength - i);
}

console.log(gammaRate * epsilonRate);