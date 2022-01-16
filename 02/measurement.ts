#!/usr/bin/env ts-node

import { input } from "./input";

let depth = 0;
let horizontalPosition = 0;

input.forEach(command => {
    const [commandName, commandParameter] = command.split(" ");
    const distance = Number.parseInt(commandParameter);
    switch (commandName) {
        case "forward": {
            horizontalPosition += distance;
            break;
        }
        case "up": {
            depth -= distance;
            break;
        }
        case "down": {
            depth += distance;
            break;
        }
    } 
        
});

console.log(horizontalPosition * depth);