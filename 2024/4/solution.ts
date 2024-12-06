// https://adventofcode.com/2024/day/4

import { getInput, getLineSeparator, transpose } from "../../util.ts";

const input = await getInput(import.meta);

const grid = input.split(getLineSeparator()).map(line => line.split(''));

let totalXmases = 0;

// Part 1

// Horizontal
for (const line of input.split(getLineSeparator())) {
    totalXmases += line.matchAll(/XMAS/g).toArray().length + line.matchAll(/SAMX/g).toArray().length;
}
console.log('Part 1 Horizontal:', totalXmases);

// Vertical
let _totalXmasesPrev = totalXmases;
const rotatedGrid = transpose(grid);
for (const _line of rotatedGrid) {
    const line = _line.join('');
    console.log(line);
    totalXmases += line.matchAll(/XMAS/g).toArray().length + line.matchAll(/SAMX/g).toArray().length;
}

console.log('Part 1 Vertical:', totalXmases - _totalXmasesPrev);

// Diagonal
_totalXmasesPrev = totalXmases;
for (let y = 0; y < grid.length; y++) {
    const line = grid[y];

    for (let x = 0; x < line.length; x++) {
        const strForwards = getDiagonal(grid, y, x);
        if(strForwards === "XMAS" || strForwards === 'SAMX') totalXmases++;

        const strBackwards = getDiagonal(grid, y, x, false);
        if(strBackwards === "XMAS" || strBackwards === 'SAMX') totalXmases++;
    }
}
console.log('Part 1 Diagonal:', totalXmases - _totalXmasesPrev);

console.log('Part 1 Total:', totalXmases);

function getDiagonal(grid: string[][], y: number, x: number, forwards = true): string {
    if(y+3 >= grid.length) return "";
    if(forwards && x+3 > grid[0].length) return "";
    if(!forwards && x-3 < 0) return "";

    return (forwards ? [
        grid[y][x],
        grid[y + 1][x + 1],
        grid[y + 2][x + 2],
        grid[y + 3][x + 3]
    ] : [
        grid[y][x],
        grid[y + 1][x - 1],
        grid[y + 2][x - 2],
        grid[y + 3][x - 3]
    ]).join('');
}