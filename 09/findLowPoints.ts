#!/usr/bin/env ts-node

import { heightMap } from "./input";

const width = heightMap[0].length;
const height = heightMap.length;
const countRiskAndLowPoint = (currNumber: number, restOfNumbers: string[]) => {
    let numbers = restOfNumbers.map(x => parseInt(x));
    let isLowPoint = currNumber === Math.min(currNumber, ...numbers) && numbers.indexOf(currNumber) === -1;
    let riskLevel = currNumber + 1;
    return {
        isLowPoint: isLowPoint,
        riskLevel: riskLevel
    };
}
let result = 0;
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
        const {isLowPoint, riskLevel} = countRiskAndLowPoint(currNumber, numbers);
        console.log(isLowPoint, riskLevel)
        if(isLowPoint) {
            result += riskLevel;
        }
    }
}

console.log(result);