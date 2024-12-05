// https://adventofcode.com/2024/day/3

import { getInput } from "../../util.ts";

const input = await getInput(import.meta);

const matchedInstructions = () => input.matchAll(/mul\(([0-9]+),([0-9]+)\)/g);

// Part 1
let combinedSum = matchedInstructions().reduce((sum, match) => sum + (+match[1] * +match[2]), 0);

console.log('Part 1:', combinedSum);



// Part 2
const newMatchedInstructions = matchedInstructions().filter((instruction) => {
    const index = instruction.index;
    const substr = input.slice(0, index);

    const lastDontIndex = substr.lastIndexOf('don\'t()');
    const lastDoIndex = substr.lastIndexOf('do()');

    // when last do was AFTER the last don't, return true
    return lastDontIndex > -1 ? lastDontIndex < lastDoIndex : true;
})

combinedSum = newMatchedInstructions.reduce((sum, match) => sum + (+match[1] * +match[2]), 0);

console.log('Part 2:', combinedSum);

