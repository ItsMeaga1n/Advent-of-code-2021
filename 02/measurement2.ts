#!/usr/bin/env ts-node

import { input } from "./input";

let depth = 0;
let horizontalPosition = 0;
let aim = 0;

input.forEach(command => {
    const [commandName, commandParameter] = command.split(" ");
    const distance = Number.parseInt(commandParameter);
    switch (commandName) {
        case "forward": {
            horizontalPosition += distance;
            depth += (distance * aim);
            break;
        }
        case "up": {
            aim -= distance;
            break;
        }
        case "down": {
            aim += distance;
            break;
        }
    } 
        
});

console.log(horizontalPosition * depth);