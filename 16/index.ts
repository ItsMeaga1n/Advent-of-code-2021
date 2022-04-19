#!/usr/bin/env ts-node

const debugging = false;

const debugMessage = (msg: string) => debugging && console.log(msg);

interface Packet {
  version: number;
  type: number;
  literalValue?: number;
  subpackets?: number;
  bitsOfSubpackets?: number;
  bits: number;
}

interface Expected {
  bits: number;
  subpackets: number;
}

const parseHex = (hexDigit: string): string => {
  switch (hexDigit.toLowerCase()) {
    case "0": return "0000";
    case "1": return "0001";
    case "2": return "0010";
    case "3": return "0011";
    case "4": return "0100";
    case "5": return "0101";
    case "6": return "0110";
    case "7": return "0111";
    case "8": return "1000";
    case "9": return "1001";
    case "a": return "1010";
    case "b": return "1011";
    case "c": return "1100";
    case "d": return "1101";
    case "e": return "1110";
    case "f": return "1111";
    default: throw new Error("Invalid hex digit");
  }
};

const splitIntoPackets = (parsedHex: string): Packet[] => {
  const res: Packet[] = [];
  const nextExpected: Expected[] = [{ bits: 0, subpackets: 1 }];
  let bittypes = "";
  while (parsedHex.length > 6) {
    const currExpected = nextExpected.shift();
    if (!currExpected) {
      debugMessage(bittypes);
      return res;
    }
    const version = parseInt(parsedHex.substr(0, 3), 2);
    const type = parseInt(parsedHex.substr(3, 3), 2);
    bittypes += "VVVTTT";
    debugMessage(`Type: ${type}, Version: ${version}`);
    parsedHex = parsedHex.substr(6);
    if (type === 4) {
      let literalValue = 0;
      let bits = 6;
      while (parsedHex[0] === "1") {
        debugMessage(`Not last value: ${parsedHex.substring(0, 5)}`);
        literalValue += parseInt(parsedHex.substr(1, 4), 2);
        parsedHex = parsedHex.substr(5);
        bits += 5;
        bittypes += "NNNNN";
      }
      debugMessage(`Last value: ${parsedHex.substring(0, 5)}`);
      literalValue += parseInt(parsedHex.substr(1, 4), 2);
      parsedHex = parsedHex.substr(5);
      bits += 5;
      bittypes += "NNNNN";

      res.push({
        version,
        type,
        literalValue,
        bits: bits
      });

      if (currExpected.bits > 0) {
        currExpected.bits -= bits;
        if (currExpected.bits > 0) {
          nextExpected.unshift(currExpected);
        }
      } else {
        currExpected.subpackets--;
        if (currExpected.subpackets > 0) {
          nextExpected.unshift(currExpected);
        }
      }
    } else {
      if (parsedHex[0] === "0") {
        const bitsInSubPackets = parseInt(parsedHex.substr(1, 15), 2);
        debugMessage(`Bits in sequence: ${bitsInSubPackets} ${parsedHex.substring(0, 16)}`);
        parsedHex = parsedHex.substr(16);
        bittypes += "ILLLLLLLLLLLLLLL";
        if (currExpected.bits - 16 > 0) {
          currExpected.bits -= 16;
          if (currExpected.bits > 0) {
            nextExpected.unshift(currExpected);
          }
        } else {
          currExpected.subpackets--;
          if (currExpected.subpackets > 0) {
            nextExpected.unshift(currExpected);
          }
        }
        nextExpected.push({
          bits: bitsInSubPackets,
          subpackets: 0,
        });
        res.push({
          version,
          type,
          bitsOfSubpackets: bitsInSubPackets,
          bits: 22
        });
      } else {
        const numberOfSubPackets = parseInt(parsedHex.substr(1, 11), 2);
        debugMessage(`Additional packages: ${numberOfSubPackets} ${parsedHex.substring(0, 12)}`);
        parsedHex = parsedHex.substr(12);
        bittypes += "ILLLLLLLLLLL";
        if (currExpected.bits - 12 > 0) {
          currExpected.bits -= 12;
          if (currExpected.bits > 0) {
            nextExpected.unshift(currExpected);
          }
        } else {
          currExpected.subpackets--;
          if (currExpected.subpackets > 0) {
            nextExpected.unshift(currExpected);
          }
        }
        nextExpected.push({
          bits: 0,
          subpackets: numberOfSubPackets,
        });
        res.push({
          version,
          type,

          subpackets: numberOfSubPackets,
          bits: 18
        });
      }
    }
  }
  debugMessage(bittypes);
  return res;
};


export const SumUpVersionNumbers = (input: string) => {
  const parsedHexString = input.split("").map(parseHex).join("");
  debugMessage(parsedHexString)
  const res = splitIntoPackets(parsedHexString);
  return res.reduce((acc, curr) => acc + curr.version, 0);
}

export const Calculate = (input: string) => {
  const parsedHexString = input.split("").map(parseHex).join("");
  debugMessage(parsedHexString)
  const packages = splitIntoPackets(parsedHexString);
  let currentNumbers:number[] = [];
  let currentBits:number[] = [];
  for (let i = packages.length; i > 0; i--) {
    if (packages[i - 1].type === 4) {
      currentNumbers.unshift(packages[i - 1].literalValue!);
      currentBits.unshift(packages[i - 1].bits!);
    }
    if (packages[i - 1].type === 0) {
      if (packages[i - 1].subpackets) {
        currentNumbers.unshift(currentNumbers.splice(0, packages[i - 1].subpackets).reduce((acc, curr) => acc + curr, 0));
        currentBits.unshift(currentBits.splice(0, packages[i - 1].subpackets).reduce((acc, curr) => acc + curr, 0) + packages[i - 1].bits!);
      } else {
        let numberOfBits = packages[i - 1].bitsOfSubpackets!;
        let res = 0;
        while(numberOfBits !== 0) {
          res += currentNumbers.shift() ?? 0;
          numberOfBits -= currentBits.shift() ?? 0;
        }
        currentNumbers.unshift(res);
        currentBits.unshift(packages[i - 1].bitsOfSubpackets! + packages[i - 1].bits);
      }
    } else if (packages[i - 1].type === 1) {
      if (packages[i - 1].subpackets) {
        currentNumbers.unshift(currentNumbers.splice(0, packages[i - 1].subpackets).reduce((acc, curr) => acc * curr, 1));
        currentBits.unshift(currentBits.splice(0, packages[i - 1].subpackets).reduce((acc, curr) => acc + curr, 0) + packages[i - 1].bits!);
      } else {
        let numberOfBits = packages[i - 1].bitsOfSubpackets!;
        let res = 1;
        while(numberOfBits !== 0) {
          res *= currentNumbers.shift() ?? 0;
          numberOfBits -= currentBits.shift() ?? 0;
        }
        currentNumbers.unshift(res);
        currentBits.unshift(packages[i - 1].bitsOfSubpackets! + packages[i - 1].bits);
      }
    } else if (packages[i - 1].type === 2) {
      if (packages[i - 1].subpackets) {
        currentNumbers.unshift(Math.min(...currentNumbers.splice(0, packages[i - 1].subpackets)));
        currentBits.unshift(currentBits.splice(0, packages[i - 1].subpackets).reduce((acc, curr) => acc + curr, 0) + packages[i - 1].bits!);
      } else {
        let numberOfBits = packages[i - 1].bitsOfSubpackets!;
        let minimumPackages:number[] = [];
        while(numberOfBits !== 0) {
          minimumPackages.push(currentNumbers.shift() ?? 0);
          numberOfBits -= currentBits.shift() ?? 0;
        }
        currentNumbers.unshift(Math.min(...minimumPackages));
        currentBits.unshift(packages[i - 1].bitsOfSubpackets! + packages[i - 1].bits);
      }
    } else if (packages[i - 1].type === 3) {
      if (packages[i - 1].subpackets) {
        currentNumbers.unshift(Math.max(...currentNumbers.splice(0, packages[i - 1].subpackets)));
        currentBits.unshift(currentBits.splice(0, packages[i - 1].subpackets).reduce((acc, curr) => acc + curr, 0) + packages[i - 1].bits!);
      } else {
        let numberOfBits = packages[i - 1].bitsOfSubpackets!;
        let minimumPackages:number[] = [];
        while(numberOfBits !== 0) {
          minimumPackages.push(currentNumbers.shift() ?? 0);
          numberOfBits -= currentBits.shift() ?? 0;
        }
        currentNumbers.unshift(Math.max(...minimumPackages));
        currentBits.unshift(packages[i - 1].bitsOfSubpackets! + packages[i - 1].bits);
      }
    } else if (packages[i - 1].type === 5) {
      const [first, second] = currentNumbers.splice(0, 2);
      currentNumbers.unshift(first > second ? 1 : 0);
      currentBits.unshift(currentBits.splice(0, 2).reduce((acc, curr) => acc + curr, 0) + packages[i - 1].bits!);
    } else if (packages[i - 1].type === 6) {
      const [first, second] = currentNumbers.splice(0, 2);
      currentNumbers.unshift(first < second ? 1 : 0);
      currentBits.unshift(currentBits.splice(0, 2).reduce((acc, curr) => acc + curr, 0) + packages[i - 1].bits!);
    } else if (packages[i - 1].type === 7) {
      const [first, second] = currentNumbers.splice(0, 2);
      currentNumbers.unshift(first === second ? 1 : 0);
      currentBits.unshift(currentBits.splice(0, 2).reduce((acc, curr) => acc + curr, 0) + packages[i - 1].bits!);
    }
  }
  return currentNumbers[0];
};
