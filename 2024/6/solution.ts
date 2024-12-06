// https://adventofcode.com/2024/day/6

// import { scheduler } from 'node:timers/promises';
import { getInput, getLineSeparator } from '../../util.ts';

enum Direction {
  up,
  down,
  left,
  right,
}
console.time('part1');
const input = await getInput(import.meta, false);

const lines = input.split(getLineSeparator());
const lineLength = lines[0].length;

// Part 1
let grid = lines.map((line) => line.split(''));
const startPositionY = lines.findIndex((line) => line.includes('^'));
const startPositionX = lines[startPositionY].indexOf('^');

let curPosX = startPositionX;
let curPosY = startPositionY;
let curDir: Direction = Direction.up;

while (curPosX > 0 && curPosX < lineLength && curPosY > 0 && curPosY < lines.length - 1) {
  grid[curPosY][curPosX] = 'X';

  if (curDir === Direction.up) curPosY--;
  if (curDir === Direction.down) curPosY++;
  if (curDir === Direction.left) curPosX--;
  if (curDir === Direction.right) curPosX++;

  if (grid[curPosY][curPosX] === '#') {
    // obstacle
    if (curDir === Direction.up) {
      curDir = Direction.right;
      curPosY++;
    } else if (curDir === Direction.down) {
      curDir = Direction.left;
      curPosY--;
    } else if (curDir === Direction.left) {
      curDir = Direction.up;
      curPosX++;
    } else if (curDir === Direction.right) {
      curDir = Direction.down;
      curPosX--;
    }
  } else {
    grid[curPosY][curPosX] = '^';
  }


  // const sliceMin = curPosY-20;
  // const sliceMax = curPosY+20;
  // console.clear();
  // console.log(grid.map(line => line.join('')).slice(sliceMin >= 0 ? sliceMin : 0, sliceMax < grid.length ? sliceMax : grid.length-1).join(getLineSeparator()));

  // const linesWithX = grid.map((line) => line.join()).filter((line) => line.includes('X'));
  // const sumPart1 = linesWithX.map((line) => (line.match(/X/g) || []).length).reduce((sum, current) => sum + current, 0);
  // console.log(sumPart1, traversedPositionsAndRotation.length)
  // await scheduler.wait(100);
}

console.timeEnd('part1');

const linesWithX = grid.map((line) => line.join()).filter((line) => line.includes('X'));
const sumPart1 = linesWithX.map((line) => (line.match(/X/g) || []).length).reduce((sum, current) => sum + current, 0);

console.log('Part 1:', sumPart1 + 1); // +1 to account for last position

// Part 2
grid = lines.map((line) => line.split(''));
curPosX = startPositionX;
curPosY = startPositionY;
curDir = Direction.up;

console.time('part2');

let loops = 0;

// BRUTEFORCE IT X)
for (let y = 0; y < grid.length; y++) {
  const line = grid[y];
  for (let x = 0; x < line.length; x++) {
    grid = lines.map((line) => line.split(''));
    curPosX = startPositionX;
    curPosY = startPositionY;
    curDir = Direction.up;

    grid[y][x] = 'O';

    const traversedPositionsAndRotationCache: { x: number, y: number, dir: Direction }[] = [];
    while (curPosX > 0 && curPosX < lineLength && curPosY > 0 && curPosY < lines.length - 1) {
      grid[curPosY][curPosX] = 'X';

      if (curDir === Direction.up) curPosY--;
      if (curDir === Direction.down) curPosY++;
      if (curDir === Direction.left) curPosX--;
      if (curDir === Direction.right) curPosX++;

      if (traversedPositionsAndRotationCache.find(item => item.x === curPosX && item.y === curPosY && item.dir === curDir)) {
        // loop
        loops++;
        break;
      }

      if (grid[curPosY][curPosX] === '#' || grid[curPosY][curPosX] === 'O') {
        // obstacle
        if (curDir === Direction.up) {
          curDir = Direction.right;
          curPosY++;
        } else if (curDir === Direction.down) {
          curDir = Direction.left;
          curPosY--;
        } else if (curDir === Direction.left) {
          curDir = Direction.up;
          curPosX++;
        } else if (curDir === Direction.right) {
          curDir = Direction.down;
          curPosX--;
        }
      } else {
        grid[curPosY][curPosX] = '^';
      }

      traversedPositionsAndRotationCache.push({ x: curPosX, y: curPosY, dir: curDir });
    }
  }
}

console.timeEnd('part2');
console.log('Part 2:', loops);