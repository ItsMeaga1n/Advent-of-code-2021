#!/usr/bin/env ts-node
import { Calculate } from ".";
import { hex, test2 } from "./input";

let isError = false;
test2.forEach(test => {
  if(Calculate(test.hex) !== test.expected) {
    isError = true;
  } else {
    console.log("Najs!")
  }
});

if(!isError) {
  console.log("All tests passed!");
}

console.log(Calculate(hex));// Unfortunatwelly it's not the correct answer :c
