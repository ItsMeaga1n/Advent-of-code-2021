#!/usr/bin/env ts-node

import { input } from "./input";

let countOfIncreases = 0;
let lastMeasure = input[0];
input.forEach(measure => {
    console.log(countOfIncreases, measure);
    if(measure > lastMeasure) {
        countOfIncreases++;
    }
    lastMeasure = measure;
});

console.log(input.length, countOfIncreases);