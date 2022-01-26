#!/usr/bin/env ts-node

import { polymerTemplate, rules } from "./input";

const rulesMap:Map<string, string> = new Map();

rules.forEach(rule => {
    const [inputStr, addingStr] = rule.split(" -> ");
    rulesMap.set(inputStr, addingStr);
});


const OneStep = (template:string) => {
    let res = template[0];
    for(let i = 1; i < template.length; i++) {
        const rule = rulesMap.get(`${template[i-1]}${template[i]}`);
        if(rule) {
            res = `${res}${rule}`;
        }
        res = `${res}${template[i]}`;
    }
    
    return res;
}

let template = polymerTemplate;
for(let i = 0; i < 10; i++) {
    template = OneStep(template);
}

const resultMap:Map<string, number> = new Map();
for(let i = 0; i < template.length; i++) {
    const currCount = resultMap.get(template[i]) ?? 0;
    resultMap.set(template[i], currCount + 1);
}
const resultNumbers:number[] = [];
resultMap.forEach(element => {
    resultNumbers.push(element);
});

resultNumbers.sort((a, b) => a - b);

console.log(resultNumbers[resultNumbers.length - 1] - resultNumbers[0])