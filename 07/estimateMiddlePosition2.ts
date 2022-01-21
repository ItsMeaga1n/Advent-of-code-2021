#!/usr/bin/env ts-node

import { horizontalPositions } from "./input";

function calculateFuelForDistance(num:number) {
    if (num === 0 || num === 1){
        return num;

    }
    for (var i = num - 1; i >= 1; i--) {
      num += i;
    }
    return num;
  }

const median = horizontalPositions.sort()[Math.floor(horizontalPositions.length / 2)];
const calculateFuel = (desiredPosition: number) => {
    let fuelNeeded = 0;
    horizontalPositions.forEach((x:number) => {
        fuelNeeded += calculateFuelForDistance(Math.abs(x - desiredPosition));
    });
    return fuelNeeded;
}

let min = calculateFuel(median);

let i = 1;

while(calculateFuel(median - i) < min) {
    min = calculateFuel(median - i);
    i++
}
console.log(i, min);

while(calculateFuel(median + i) < min) {
    min = calculateFuel(median + i);
    i++
}
console.log(i, min);