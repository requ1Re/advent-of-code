// https://adventofcode.com/2024/day/9

import { getInput } from "../../util.ts";

const input = await getInput(import.meta, true);


console.time('part1');
console.log('Part 1:', solve(input));
console.timeEnd('part1');

function getDiskMap(input: string): string {
    let diskMapStr = "";
    let isFile = true;

    let fileId = 0;
    for (let i = 0; i < input.length; i++) {
        const num = +input[i];

        if (isFile) {
            diskMapStr += fileId.toString().repeat(num);
            fileId++;
        } else {
            diskMapStr += ".".repeat(num);
        }

        console.log(diskMapStr);
        isFile = !isFile;
    }

    return diskMapStr;
}

function getDefragmentedDiskMap(input: string): string {
    const diskMap = getDiskMap(input);

    let currentMap = diskMap;
    const numOfDots = diskMap.matchAll(/\./g).toArray().length;

    let iteration = 0;
    while (!currentMap.endsWith(".".repeat(numOfDots))) {
        const indexOfFirstDot = currentMap.indexOf('.');
        const lastNumberIndex = currentMap.length - 1 - iteration;
        const lastNumber = currentMap[lastNumberIndex];

        currentMap = 
            currentMap.slice(0, indexOfFirstDot) 
            + lastNumber 
            + currentMap.slice(indexOfFirstDot + 1, lastNumberIndex) 
            + '.'.repeat(iteration + 1);

            console.log(currentMap);

        iteration++;
    }

    return currentMap;
}

export function solve(input: string): number {
    const defragmentedDiskMap = getDefragmentedDiskMap(input);
    const defragmentedDiskMapWithoutEmptySpace = defragmentedDiskMap.replaceAll('.', '');

    let checksum = 0;

    for(let i = 0; i < defragmentedDiskMapWithoutEmptySpace.length; i++){
        const numAtPos = +(defragmentedDiskMapWithoutEmptySpace[i]);

        checksum += (i * numAtPos);
    }

    return checksum;
}