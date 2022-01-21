#!/usr/bin/env ts-node

import { input } from "./input";

const brokenToFixedMapper = {
    segments: new Map(),
    map: (cypher: string) => {
        if(cypher.length === 2) {
            return 1;
        }
        if(cypher.length === 4) {
            return 4;
        }
        if(cypher.length === 3) {
            return 7;
        }
        if(cypher.length === 7) {
            return 8;
        }
        return 0;
    }
}

let result = 0;

input.forEach((line: string) => {
    const [observations, output] = line.split(" | ");

    output.split(" ").forEach((outputCypher: string) => {
        const mapped = brokenToFixedMapper.map(outputCypher);
        if(mapped > 0) {
            result++;
        }
    })
})

console.log(result);