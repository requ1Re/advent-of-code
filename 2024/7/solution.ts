// https://adventofcode.com/2024/day/7

import { getInput, getLineSeparator } from "../../util.ts";

const input = await getInput(import.meta, false);
const lines = input.split(getLineSeparator())

// Part 1
console.time('part1');
console.log('Part 1:', solve(lines));
console.timeEnd('part1');

// Part 2
console.time('part2');
console.log('Part 2:', solve(lines, ['+', '*', '|']));
console.timeEnd('part2');

export function solve(lines: string[], operators = ['+', '*']): number {
    let totalSum = 0;
    for (const line of lines) {
        const splitLine = line.split(': ');
        const target = +splitLine[0];
        const numbers = splitLine[1].split(' ').map(i => +i);

        const listOfPossibleCombinations = generateCombinations(numbers.length - 1, operators);
        for (const p of listOfPossibleCombinations) {
            let sum = numbers[0];

            for (let i = 0; i < numbers.length; i++) {
                if (numbers.length <= i) continue;
                const nextNum = numbers[i + 1];
                const operator = p[i];

                if (operator === '+') {
                    sum += nextNum;
                } else if (operator === '*') {
                    sum *= nextNum;
                } else if (operator === '|') {
                    sum = +(`${sum}${nextNum}`);
                }
            }

            if (sum === target) {
                totalSum += sum;
                break;
            }
        }
    }
    return totalSum;
}

function generateCombinations(n: number, operators = ['+', '*'], current: string = '', result: string[] = []): string[] {
    if (current.length === n) {
        result.push(current);
        return result;
    }

    for (const operator of operators) {
        generateCombinations(n, operators, current + operator, result);
    }

    return result;
}