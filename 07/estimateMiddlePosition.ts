#!/usr/bin/env ts-node

import { horizontalPositions } from "./input";

const median = horizontalPositions.sort()[Math.floor(horizontalPositions.length / 2)];
const calculateFuel = (desiredPosition: number) => {
    let fuelNeeded = 0;
    horizontalPositions.forEach((x:number) => fuelNeeded += Math.abs(x - desiredPosition));
    return fuelNeeded;
}

let min = calculateFuel(median);

let i = 1;

while(calculateFuel(median - i) < min) {
    min = calculateFuel(median - i);
    i++
}

while(calculateFuel(median + i) < min) {
    min = calculateFuel(median + i);
    i++
}
console.log(i, min);