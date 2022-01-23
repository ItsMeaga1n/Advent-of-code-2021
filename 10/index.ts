#!/usr/bin/env ts-node

import { lines } from "./input";

let score = 0;
const startSigns = ["(", "[", "{", "<"];
lines.forEach(line => {
    let stack: string[] = [];
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
            score += {
                ")": 3,
                "]": 57,
                "}": 1197,
                ">": 25137
            }[line[i]] ?? 0;
            break;
        }
    }
});

console.log(score);