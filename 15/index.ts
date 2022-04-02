#!/usr/bin/env ts-node

import { riskLevels } from "./input";



const maxX = riskLevels[0].length - 1;
const maxY = riskLevels.length - 1;

const accumulatedMatrix: number[][] = [];
for(let i = 0; i <= maxY; i++) {
    accumulatedMatrix.push([]);
    for(let j = 0; j <= maxX; j++) {
        accumulatedMatrix[i].push(Infinity);
    }
}
accumulatedMatrix[0][0] = 0;
let currentLowest = Infinity;
const findPaths = (accRiskLevel: number, x: number, y: number, history: string[]) => {
    accRiskLevel = accRiskLevel + parseInt(riskLevels[y][x]);
    
    if(accRiskLevel >= accumulatedMatrix[y][x] || accRiskLevel >= currentLowest) {
        return;
    }
    accumulatedMatrix[y][x] = accRiskLevel;
    const currHistory = [...history, `${y},${x}`]

    if(y === maxY && x === maxX) {
        currentLowest = Math.min(currentLowest, accRiskLevel)
        return;
    }
    if(y < maxY) {
        findPaths(accRiskLevel,  x, y + 1, [...currHistory]);
    }
    if(x > 0) {
        findPaths(accRiskLevel,  x - 1, y, [...currHistory]);
    }
    if(x < maxX) {
        findPaths(accRiskLevel, x + 1, y, [...currHistory]);
    }
    if(y > 0) {
        findPaths(accRiskLevel, x, y - 1, [...currHistory]);
    }
}

findPaths(0,  0, 1, ["0,0"]);
findPaths(0, 1, 0, ["0,0"]);

console.table(accumulatedMatrix)
console.log(currentLowest)