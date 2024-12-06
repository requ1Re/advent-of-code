// https://adventofcode.com/2024/day/4

import { getInput, getLineSeparator } from "../../util.ts";

const input = await getInput(import.meta, true);

const grid = input.split(getLineSeparator()).map(line => line.split(''));

let totalXmases = 0;

// Part 1

// Horizontal
for (const line of input.split(getLineSeparator())) {
    totalXmases += line.matchAll(/XMAS/g).toArray().length + line.matchAll(/SAMX/g).toArray().length;
}
console.log('Part 1 Horizontal:', totalXmases);

// Diagonal
let _totalXmasesPrev = totalXmases;
for (let y = 0; y < grid.length; y++) {
    const line = grid[y];

    for (let x = 0; x < line.length; x++) {
        const char = line[x];

        if (char === 'X') {
            const diagonalLeft = getDiagonal(grid, x, y, false)
            const diagonalRight = getDiagonal(grid, x, y)

            if (diagonalLeft.join('') === 'XMAS') totalXmases++;
            if (diagonalRight.join('') === 'XMAS') totalXmases++;
        } else if (char === 'S') {
            const diagonalLeft = getDiagonal(grid, x, y, false)
            const diagonalRight = getDiagonal(grid, x, y)

            if (diagonalLeft.join('') === 'SAMX') totalXmases++;
            if (diagonalRight.join('') === 'SAMX') totalXmases++;
        }
    }
}
console.log('Part 1 Diagonal:', totalXmases - _totalXmasesPrev);

// Vertical
_totalXmasesPrev = totalXmases;
for (let y = 0; y < grid.length; y++) {
    const line = grid[y];

    for (let x = 0; x < line.length; x++) {
        const char = line[x];

        if (char === 'X') {
            const vertical = getVertical(grid, x, y);
            if (vertical.join('') === 'XMAS') totalXmases++;
        } else if (char === 'S') {
            const vertical = getVertical(grid, x, y);
            if (vertical.join('') === 'SAMX') totalXmases++;
        }
    }
}
console.log('Part 1 Vertical:', totalXmases - _totalXmasesPrev);

console.log('Part 1 Total:', totalXmases);


function getDiagonal(input: string[][], startIndexX: number, startIndexY: number, rightwards = true): string[] {
    if (startIndexY + 3 >= input.length) return [];

    if (rightwards) {
        if (startIndexX + 3 >= input[startIndexY].length) return [];

        return [input[startIndexY][startIndexX], input[startIndexY + 1][startIndexX + 1], input[startIndexY + 2][startIndexX + 2], input[startIndexY + 3][startIndexX + 3]]
    } else {
        if (startIndexX - 3 <= input[startIndexY].length) return [];

        return [input[startIndexY][startIndexX], input[startIndexY + 1][startIndexX - 1], input[startIndexY + 2][startIndexX + 2], input[startIndexY + 3][startIndexX - 3]]
    }
}

function getVertical(input: string[][], startIndexX: number, startIndexY: number): string[] {
    if (startIndexY + 3 >= input.length) return [];

    return [input[startIndexY][startIndexX], input[startIndexY + 1][startIndexX], input[startIndexY + 2][startIndexX], input[startIndexY + 3][startIndexX]]
}