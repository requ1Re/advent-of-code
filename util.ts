import * as path from "jsr:@std/path";

export async function getInput(importMeta: ImportMeta): Promise<string> {
    return await Deno.readTextFile(`${getModuleDir(importMeta)}/input.txt`);
}

function getModuleDir(importMeta: ImportMeta): string {
    return path.resolve(path.dirname(path.fromFileUrl(importMeta.url)));
}