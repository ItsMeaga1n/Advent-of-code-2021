#!/usr/bin/env ts-node

import { coords, folds } from "./input";

enum Direction {
    vertical,
    horizontal
}
interface Point {
    x: number,
    y: number
}
interface Instruction {
    direction: Direction,
    coord: number
}

const parseInstruction = (instruction: string): Instruction => {
    const coord = parseInt(instruction.split("=")[1])
    return {
        direction: instruction.indexOf("x") !== -1 ? Direction.vertical : Direction.horizontal,
        coord: coord
    }
}

let card:Set<string> = new Set();

for(let i = 0; i < coords.length; i++) {
    card.add(coords[i]);
}

const fold = (instruction:Instruction):Set<string> => {
    const newCard:Set<string> = new Set();
    const {direction, coord} = instruction;
    card.forEach(pointStr => {
        const point = {
            x: parseInt(pointStr.split(",")[0]),
            y: parseInt(pointStr.split(",")[1]),
        }
        if(direction === Direction.vertical && point.x > coord) {
            newCard.add(`${coord - (point.x - coord)},${point.y}`);
        } else if(direction === Direction.horizontal && point.y > coord) {
            newCard.add(`${point.x},${coord - (point.y - coord)}`);
        } else {
            newCard.add(pointStr);
        }
    })
    return newCard;
}

folds.forEach(currFold => {
    const instruction = parseInstruction(currFold);
    const newCard = fold(instruction);
    card = newCard;
});

const points:Point[] = [];
card.forEach(coord => {
    points.push({
        x: parseInt(coord.split(",")[0]),
        y: parseInt(coord.split(",")[1])
    });
});

const maxX = Math.max(...points.map(currPoint => currPoint.x));
const maxY = Math.max(...points.map(currPoint => currPoint.y));

for(let i = 0; i <= maxY; i++) {
    let currLine = "";
    for(let j = 0; j <= maxX; j++) {
        if(points.some(currPoint => currPoint.x === j && currPoint.y === i)) {
            currLine += "#";
        } else {
            currLine += "."
        }
    }
    console.log(`${currLine}`);
}