#!/usr/bin/env ts-node

import { fish } from "./input";

const allFish:Map<number, number> = new Map();

fish.forEach(currFish => {
    const currFishIndex = allFish.get(currFish) ?? 0;
    allFish.set(currFish, currFishIndex + 1);
});

const passDay = () => {
    let newFish = allFish.get(0) ?? 0;
    for(let i = 0; i < 9; i++) {
        allFish.set(i, allFish.get(i + 1) ?? 0);
    }
    allFish.set(8, newFish);
    allFish.set(6, newFish + (allFish.get(6) ?? 0))
}

for(let i = 0; i < 256; i++) {
    passDay();
    console.log(allFish)
}

let totalAmmountOfFish = 0;
allFish.forEach(currFish => {
    totalAmmountOfFish += currFish
});

console.log(totalAmmountOfFish);

