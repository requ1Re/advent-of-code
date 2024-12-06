// https://adventofcode.com/2024/day/1

import { getInput, getLineSeparator } from "../../util.ts";

const input = await getInput(import.meta);

const lines = input.split(getLineSeparator());
const [list1, list2] = [0, 1].map(i => lines.map(line => +line.split('   ')[i]).sort((a, b) => +a - +b));

// Part 1
let totalDistance = 0;

for (let i = 0; i < list1.length; i++) {
    const dist = Math.abs(list1[i] - list2[i]);
    totalDistance += dist;
}

console.log('Part 1:', totalDistance);



// Part 2
let totalSimilarityScore = 0;

for(const numList1 of list1){
    const occurrancesInSecondList = list2.filter(numList2 => numList2 === numList1).length;
    const similarityScore = numList1 * occurrancesInSecondList;

    totalSimilarityScore += similarityScore;
}

console.log('Part 2:', totalSimilarityScore);