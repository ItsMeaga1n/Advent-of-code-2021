#!/usr/bin/env ts-node
import { SumUpVersionNumbers } from ".";
import { hex, tests } from "./input";

let isError = false;
tests.forEach(test => {
  if(SumUpVersionNumbers(test.hex) !== test.expected) {
    isError = true;
  }
});

if(!isError) {
  console.log("All tests passed!");
}

console.log(SumUpVersionNumbers(hex));
