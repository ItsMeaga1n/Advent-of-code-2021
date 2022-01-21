#!/usr/bin/env ts-node

import { heightMap } from "./input";

const width = heightMap[0].length;
const height = heightMap.length;
const isLowPoint = (currNumber: number, restOfNumbers: string[]) => {
    let numbers = restOfNumbers.map(x => parseInt(x));
    return currNumber === Math.min(currNumber, ...numbers) && numbers.indexOf(currNumber) === -1;
}
const countBasinSize = (i: number, j: number, checked?: string[]): number => {
    let result = 0;
    if(!checked) {
        checked = [];
    }
    checked.push(`${i},${j}:${heightMap[i][j]}`);
    if(parseInt(heightMap[i][j]) === 9) {
        return 0;
    }
    const tryAdd = (newI: number, newJ: number) => {
        if(checked!.indexOf(`${newI},${newJ}:${heightMap[newI][newJ]}`) === -1) {
            result += countBasinSize(newI, newJ, checked);
        }
    }
    if(i > 0) {
        tryAdd(i - 1, j);
    }
    if(i < height - 1) {
        tryAdd(i + 1, j);
    }
    if(j > 0) {
        tryAdd(i, j - 1);
    }
    if(j < width - 1) {
        tryAdd(i, j + 1);
    }

    result += 1;
    return result;
}

const basinSizes: number[] = [];
for(let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++) {
        let currNumber = parseInt(heightMap[i][j]);
        let numbers = [];
        if(i === 0) {
            if(j === 0) {
                numbers = [heightMap[i][j+1],heightMap[i+1][j]];
            } else if(j === width - 1) {
                numbers = [heightMap[i][j-1],heightMap[i+1][j]];
            } else {
                numbers = [heightMap[i][j-1],heightMap[i][j+1],heightMap[i+1][j]];
            }
        } else if(i === height - 1) {
            if(j === 0) {
                numbers = [heightMap[i][j+1],heightMap[i-1][j]];
            } else if(j === width - 1) {
                numbers = [heightMap[i][j-1],heightMap[i-1][j]];
            } else {
                numbers = [heightMap[i][j-1],heightMap[i][j+1],heightMap[i-1][j]];
            }
        } else if(j === 0) {
            numbers = [heightMap[i][j+1],heightMap[i-1][j], heightMap[i+1][j]];
        } else if(j === width - 1) {
            numbers = [heightMap[i][j-1],heightMap[i-1][j], heightMap[i+1][j]];
        } else {
            numbers = [heightMap[i][j+1], heightMap[i][j-1], heightMap[i+1][j], heightMap[i-1][j]];
        }
        if(isLowPoint(currNumber, numbers)) {
            basinSizes.push(countBasinSize(i, j));
        }
    }
}
const basinSorted = basinSizes.sort((a, b) => b - a);
console.log(basinSorted[0] * basinSorted[1] * basinSorted[2]);