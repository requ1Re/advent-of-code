// https://adventofcode.com/2024/day/4

import { getInput, getLineSeparator, transpose } from "../../util.ts";

const input = await getInput(import.meta, false);

const grid = input.split(getLineSeparator()).map(line => line.split(''));

let totalXmases = 0;

// Part 1

// Horizontal
for (const line of input.split(getLineSeparator())) {
    totalXmases += line.matchAll(/XMAS/g).toArray().length + line.matchAll(/SAMX/g).toArray().length;
}

// Vertical
const rotatedGrid = transpose(grid);
for (const _line of rotatedGrid) {
    const line = _line.join('');
    totalXmases += line.matchAll(/XMAS/g).toArray().length + line.matchAll(/SAMX/g).toArray().length;
}

// Diagonal
for (let y = 0; y < grid.length; y++) {
    const line = grid[y];

    for (let x = 0; x < line.length; x++) {
        const strForwards = getDiagonal(grid, y, x);
        if (strForwards === "XMAS" || strForwards === 'SAMX') totalXmases++;

        const strBackwards = getDiagonal(grid, y, x, false);
        if (strBackwards === "XMAS" || strBackwards === 'SAMX') totalXmases++;
    }
}

console.log('Part 1:', totalXmases);

// Part 2
totalXmases = 0;
for (let y = 0; y < grid.length; y++) {
    const line = grid[y];

    const matches = line.join('').matchAll(/(M|S)/g);

    for(const match of matches){
        const diag1 = getDiagonal(grid, y, match.index, true, 2);
        const diag2 = getDiagonal(grid, y, match.index+2, false, 2);

        if((diag1 === 'MAS' || diag1 === 'SAM') && (diag2 === 'MAS' || diag2 === 'SAM')) totalXmases++;
    }
}
console.log('Part 2:', totalXmases);

function getDiagonal(grid: string[][], y: number, x: number, forwards = true, steps = 3): string {
    if (y + steps >= grid.length) return "";
    if (forwards && x + steps > grid[0].length) return "";
    if (!forwards && x - steps < 0) return "";

    return (forwards ? [
        grid[y][x],
        ...Array.from(Array(steps).keys()).map(i => i + 1).map((i) => grid[y + i][x + i])
    ] : [
        grid[y][x],
        ...Array.from(Array(steps).keys()).map(i => i + 1).map((i) => grid[y + i][x - i])
    ]).join('');
}