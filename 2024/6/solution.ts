// https://adventofcode.com/2024/day/6

import { scheduler } from 'node:timers/promises';
import { getInput, getLineSeparator } from '../../util.ts';

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

const input = await getInput(import.meta);

const lines = input.split(getLineSeparator());
const lineLength = lines[0].length;
const grid = lines.map((line) => line.split(''));

// Part 1
const startPositionY = lines.findIndex((line) => line.includes('^'));
const startPositionX = lines[startPositionY].indexOf('^');

console.log(startPositionX, startPositionY);

let currentPositionX = startPositionX;
let currentPositionY = startPositionY;
let currentDirection: Direction = Direction.Up;

while (currentPositionX > 0 && currentPositionX < lineLength && currentPositionY > 0 && currentPositionY < lines.length-1) {
  grid[currentPositionY][currentPositionX] = 'X';

  if (currentDirection === Direction.Up) currentPositionY--;
  if (currentDirection === Direction.Down) currentPositionY++;
  if (currentDirection === Direction.Left) currentPositionX--;
  if (currentDirection === Direction.Right) currentPositionX++;

  if (grid[currentPositionY][currentPositionX] === '#') {
    // obstacle
    if (currentDirection === Direction.Up) {
      currentDirection = Direction.Right;
      currentPositionY++;
    }else if (currentDirection === Direction.Down) {
      currentDirection = Direction.Left;
      currentPositionY--;
    }else if (currentDirection === Direction.Left) {
      currentDirection = Direction.Up;
      currentPositionX++;
    }else if (currentDirection === Direction.Right) {
      currentDirection = Direction.Down;
      currentPositionX--;
    }
  } else {
    grid[currentPositionY][currentPositionX] = '^'; 
  }


  const sliceMin = currentPositionY-20;
  const sliceMax = currentPositionY+20;
  console.clear();
  console.log(grid.map(line => line.join('')).slice(sliceMin >= 0 ? sliceMin : 0, sliceMax < grid.length ? sliceMax : grid.length-1).join(getLineSeparator()));

  await scheduler.wait(5);
}

const linesWithX = grid.map(line => line.join()).filter(line => line.includes('X'));
const sum = linesWithX.map(line => (line.match(/X/g) || []).length).reduce((sum, curr) => sum+curr, 0)

console.log('Part 1:', sum+1); // +1 to account for last position
