// https://adventofcode.com/2024/day/2

import { getInput } from "../../util.ts";

const input = await getInput(import.meta);
const lines = input.split('\n');

let safeReports = 0;

// Part 1
safeReports = lines.filter(line => isLineSafe(line)).length;

console.log('Part 1:', safeReports);



// Part 2
for (const unsafeLine of lines.filter(line => !isLineSafe(line))) {
    const numbers = unsafeLine.split(' ').map(val => +val);

    for (let i = 0; i < numbers.length; i++) {
        const copy = [...numbers.slice(0, i), ...numbers.slice(i + 1)];

        if (isLineSafe(copy.join(' '))) {
            safeReports++;
            break;
        };
    }
}

console.log('Part 2:', safeReports);

// Common functions
function isLineSafe(line: string): boolean {
    const reports = getReports(line);

    return reports.every(report => report.isSafe && report.positive === reports[0].positive);
}

function getReports(line: string, slice = true): {
    value: number;
    isSafe: boolean;
    positive: boolean;
}[] {
    let reports = line.split(' ').map(i => +i).map((value, index, array) => {
        const diff = value - (array[index + 1] ?? value - 1);
        const isSafe = Math.abs(diff) >= 1 && Math.abs(diff) <= 3;

        return {
            value,
            isSafe,
            positive: diff < 0
        };
    });
    if (slice) reports = reports.slice(0, -1);

    return reports;
}