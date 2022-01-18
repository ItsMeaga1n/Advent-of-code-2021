#!/usr/bin/env ts-node

import { lines } from "./input";

const pointsTouched:Map<string, number> = new Map();

lines.forEach(line => {
    const [leftPointCoordinates, rightPointCoordinates] = line.split(" -> ");
    const [x1Str, y1Str] = leftPointCoordinates.split(",");
    const [x2Str, y2Str] = rightPointCoordinates.split(",");
    const x1 = parseInt(x1Str);
    const x2 = parseInt(x2Str);
    const y1 = parseInt(y1Str);
    const y2 = parseInt(y2Str);

    if(x1 === x2) {
        for(let i = 0; i <= Math.abs(y1 - y2); i++) {
            const key = `${x1},${Math.min(y1,y2)+i}`;
            const value = pointsTouched.get(key) ?? 0;
            pointsTouched.set(key, value + 1);
        }
    }
    else if(y1 === y2) {
        for(let i = 0; i <= Math.abs(x1 - x2); i++) {
            const key = `${Math.min(x1,x2)+i},${y1}`;
            const value = pointsTouched.get(key) ?? 0;
            pointsTouched.set(key, value + 1);
        }
    } else {
        for(let i = 0; i <= Math.abs(x1-x2); i++){
            const newX = x1 > x2 ? x1-i : x1+i;
            const newY = y1 > y2 ? y1-i : y1+i;
            const key = `${newX},${newY}`;
            const value = pointsTouched.get(key) ?? 0;
            pointsTouched.set(key, value + 1);
        }
    }
});

let overlapingPoints = 0;
pointsTouched.forEach(point => {
    if(point > 1) {
        overlapingPoints++;
    }
});

console.log(overlapingPoints);