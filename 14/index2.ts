#!/usr/bin/env ts-node

import { polymerTemplate, rules } from "./input";

const rulesMap:Map<string, string> = new Map();

rules.forEach(rule => {
    const [inputStr, addingStr] = rule.split(" -> ");
    rulesMap.set(inputStr, addingStr);
});


const OneStep = (currTemplate:Map<string, number>, currCounts:Map<string, number>) => {
   let res:Map<string, number> = new Map();
   for (const [key, value] of currTemplate) {
        const rule = rulesMap.get(key);
        if(rule) {
            const newKey1 = `${key[0]}${rule}`;
            const newKey2 = `${rule}${key[1]}`;
            const currCount1 = res.get(newKey1) ?? 0;
            const currCount2 = res.get(newKey2) ?? 0;
            res.set(newKey1, currCount1 + value);
            res.set(newKey2, currCount2 + value);
            currCounts.set(rule, (currCounts.get(rule) ?? 0) + value);
        } else {
            const currCount = res.get(key) ?? 0;
            res.set(key, currCount + value);
        }
   }
   return [res, currCounts];
}

let template:Map<string, number> = new Map();
let counts:Map<string, number> = new Map();
counts.set(polymerTemplate[0], 1);
for(let i = 1; i < polymerTemplate.length; i++) {
    const currKey = `${polymerTemplate[i - 1]}${polymerTemplate[i]}`;
    const currCount = template.get(currKey) ?? 0;
    template.set(currKey, currCount + 1);

    counts.set(polymerTemplate[i], (counts.get(polymerTemplate[i]) ?? 0) + 1);
}
for(let i = 0; i < 40; i++) {
    [template, counts] = OneStep(template, counts);
}

let resultNumbers:number[] = [];
for (const [key, value] of counts) {
    resultNumbers.push(value);
}


resultNumbers.sort((a, b) => a - b);

console.log(resultNumbers[resultNumbers.length - 1] - resultNumbers[0])