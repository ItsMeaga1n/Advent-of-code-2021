#!/usr/bin/env ts-node

import { input } from "./input";

class BrokenToFixedMapper {
    cypherDigits:string[] = [];
    constructor(inputConfigurations:string) {
        const cypherDigits = inputConfigurations.split(" ");
        this.cypherDigits = cypherDigits;
    }
    map = (cypher: string) => {
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
        if(cypher.length === 6) {
            const cypherFour = this.cypherDigits.find(x => x.length === 4) ?? "";
            const cypherSeven = this.cypherDigits.find(x => x.length === 3) ?? "";

            if(cypher.includes(cypherFour[0]) && cypher.includes(cypherFour[1]) && cypher.includes(cypherFour[2]) && cypher.includes(cypherFour[3])) {
                return 9;
            } else if(cypher.includes(cypherSeven[0]) && cypher.includes(cypherSeven[1]) && cypher.includes(cypherSeven[2])) {
                return 0
            } else {
                return 6;
            }
        }
        if(cypher.length === 5) {
            const cypherOne = this.cypherDigits.find(x => x.length === 2) ?? "";
            const cyphersWithFourDigits = this.cypherDigits.filter(x => x.length === 6);
            const cypherFour = this.cypherDigits.find(x => x.length === 4) ?? "";
            let cypherNine = "";
            cyphersWithFourDigits.forEach(x => {
                if(x.includes(cypherFour[0]) && x.includes(cypherFour[1]) && x.includes(cypherFour[2]) && x.includes(cypherFour[3])) {
                    cypherNine = x;
                }
            });
            if(cypher.includes(cypherOne[0]) && cypher.includes(cypherOne[1])) {
                return 3;
            }
            let matches = 0;
            for(let i = 0; i < cypherNine.length; i++) {
                if(cypher.includes(cypherNine[i])) {
                    matches++;
                }
            }
            if(matches === 5) {
                return 5;
            } else if(matches === 4) {
                return 2;
            }
        }
        throw new Error(cypher);
    }
}

let result = 0;

input.forEach((line: string) => {
    const [observations, output] = line.split(" | ");
    const brokenToFixedMapper = new BrokenToFixedMapper(observations);
    let stringResult = "";

    output.split(" ").forEach((outputCypher: string) => {
        stringResult += brokenToFixedMapper.map(outputCypher).toString();
    });
    result += parseInt(stringResult);
})

console.log(result);