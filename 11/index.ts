#!/usr/bin/env ts-node

import { octoState } from "./input";


const state: number[][] = [];
for(let i = 0; i < 10; i++) {
    state.push([]);
    for(let j = 0; j < 10; j++) {
        state[i].push(parseInt(octoState[i][j]));
    }
}

const printState = () => {
    let wrongState = false;
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            wrongState = wrongState || state[i][j] > 9;
        }
    }
    for(let i = 0; i < 10; i++) {
        let str = "";
        for(let j = 0; j < 10; j++) {
            str += state[i][j] + ",";
        }
        console.log(str)
    }
    if(wrongState) {
        throw new Error("State is wrong!");
    }
}


const add1ToAll = () => {
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            state[i][j] += 1;
        }
    }
}

let totalFlashes = 0;

const checkForNewFlash = (flashed: Set<string>): string[] => {
    let newFlashes: string[] = [];
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            const currId = `${i},${j}`;
            if(state[i][j] > 9 && !flashed.has(currId)) {
                newFlashes.push(currId);
            }
        }
    }
    return newFlashes;
};

const performFlash = (x:number, y:number):void => {
    if(x > 0) {
        if(y > 0) {
            state[x-1][y-1] = state[x-1][y-1] + 1
        }
        if(y < 9) {
            state[x-1][y+1] = state[x-1][y+1] + 1
        }
        state[x-1][y] = state[x-1][y] + 1
    }
    if(x < 9) {
        if(y > 0) {
            state[x+1][y-1] = state[x+1][y-1] + 1
        }
        if(y < 9) {
            state[x+1][y+1] = state[x+1][y+1] + 1
        }
        state[x+1][y] = state[x+1][y] + 1
    }
    if(y > 0) {
        state[x][y - 1] = state[x][y - 1] + 1
    }
    if(y < 9) {
        state[x][y + 1] = state[x][y + 1] + 1
    }
}

for(let i = 0; i < 100; i++) {
    const flashed: Set<string> = new Set();
    add1ToAll();
    let areNewFlashes = false;
    do {
        let newFlashes = checkForNewFlash(flashed);
        areNewFlashes = newFlashes.length > 0;
        newFlashes.forEach(currFlash => {
            flashed.add(currFlash);
            const [x, y] = currFlash.split(",");
            performFlash(parseInt(x), parseInt(y));
        });
    }while(areNewFlashes);
    
    flashed.forEach(currFlash => {
        const [x, y] = currFlash.split(",");
        state[parseInt(x)][parseInt(y)] = 0;
        totalFlashes += 1;
    });
    if(flashed.size === 100) {
        console.log(`All flashed on step ${i + 1}`)
    }
}


console.log(totalFlashes);