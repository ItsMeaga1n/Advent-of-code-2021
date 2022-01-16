#!/usr/bin/env ts-node

import { input } from "./input";

const inputLength = input[0].length;
let oxygenGeneratorRating = "";
let co2ScrubberRate = "";
let activeNumbers = new Array(input.length).fill(1);

for(let i=0; i < inputLength; i++) {
    let zeroCount = 0;
    activeNumbers.forEach((activeNumber, index) => {
        if(activeNumber) {
            zeroCount += input[index][i] === "0" ? 1 : -1;
        }
    });
    console.log("Zero count for ", i, " oxygen: ", zeroCount)
    if(zeroCount > 0) {
        activeNumbers.forEach((activeNumber, index) => {
            if(input[index][i] === "1") {
                activeNumbers[index] = 0;
            }
        });
    } else {
        activeNumbers.forEach((activeNumber, index) => {
            if(input[index][i] === "0") {
                activeNumbers[index] = 0;
            }
        });
    }
    console.log("Ammount of position left: ", activeNumbers.filter(x => x === 1).length)
    if(activeNumbers.filter(x => x === 1).length === 1) {
        oxygenGeneratorRating = input[activeNumbers.indexOf(1)]
        break;
    }
}

activeNumbers = new Array(input.length).fill(1);
for(let i=0; i < inputLength; i++) {
    let zeroCount = 0;
    activeNumbers.forEach((activeNumber, index) => {
        if(activeNumber) {
            zeroCount += input[index][i] === "0" ? 1 : -1;
        }
    });
    console.log("Zero count for ", i, " co2: ", zeroCount)
    if(zeroCount <= 0) {
        activeNumbers.forEach((activeNumber, index) => {
            if(input[index][i] === "1") {
                activeNumbers[index] = 0;
            }
        });
    } else {
        activeNumbers.forEach((activeNumber, index) => {
            if(input[index][i] === "0") {
                activeNumbers[index] = 0;
            }
        });
    }
    console.log("Ammount of position left: ", activeNumbers.filter(x => x === 1).length)
    if(activeNumbers.filter(x => x === 1).length === 1) {
        co2ScrubberRate = input[activeNumbers.indexOf(1)]
        break;
    }
}


let oxygenRes = 0;
let co2Res = 0;
for(let i=inputLength; i > 0; i--) {
    co2Res += parseInt(co2ScrubberRate[i - 1]) * Math.pow(2, inputLength - i);
    oxygenRes += parseInt(oxygenGeneratorRating[i - 1]) * Math.pow(2, inputLength - i);
}

console.log(oxygenGeneratorRating, co2ScrubberRate)

console.log(co2Res * oxygenRes);