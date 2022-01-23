#!/usr/bin/env ts-node

import { lines } from "./input";

let scores: number[] = [];
const startSigns = ["(", "[", "{", "<"];
lines.forEach(line => {
    let stack: string[] = [];
    let isCorrupted = false;
    for(let i = 0; i < line.length; i++) {
        if(startSigns.indexOf(line[i]) !== -1) {
            stack.push(line[i]);
            continue;
        }
        const expectedClosingSign = {
            "(":")",
            "[":"]",
            "{":"}",
            "<":">"
        }[stack.pop() ?? "("];
        if(expectedClosingSign !== line[i]) {
            isCorrupted = true;
            break;
        }
    }
    if(!isCorrupted) {
        let score = 0;
        while(stack.length > 0) {
            const openSign = stack.pop();
            score *= 5;
            let valueToAdd = {
                "(": 1,
                "[": 2,
                "{": 3,
                "<": 4
            }[openSign ?? ""] ?? 0;
            if(valueToAdd === 0) {
                throw new Error(openSign);
            }
            score += valueToAdd;
        }            
        scores.push(score);
    }
});

scores.sort((a,b) => a - b);
console.log(scores, scores.length)
console.log(scores[Math.floor(scores.length / 2)]);