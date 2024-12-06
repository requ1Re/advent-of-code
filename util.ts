import * as path from "jsr:@std/path";
import * as mod from "node:os";

/**
 * Get input as one continuous string
 * @param importMeta import.meta
 * @param sample use sample data (input_sample.txt)
 * @returns input string
 */
export async function getInput(importMeta: ImportMeta, sample: boolean = false): Promise<string> {
    return await Deno.readTextFile(`${getModuleDir(importMeta)}/input${sample ? '_sample' : ''}.txt`);
}

function getModuleDir(importMeta: ImportMeta): string {
    return path.resolve(path.dirname(path.fromFileUrl(importMeta.url)));
}

export function getLineSeparator() {
    return mod.platform() === 'win32' ? '\r\n' : '\n';
}

/**
 * Transposes (rotates 90 degrees) a two dimensional array
 * @param arr 2D Array
 * @returns 90 degree rotated 2D Array
 */
export function transpose(arr: string[][]) {
    return Object.keys(arr[0]).map((_, i) => arr.map((r) => r[i]));
}