import * as path from "jsr:@std/path";
import * as mod from "node:os";

export async function getInput(importMeta: ImportMeta): Promise<string> {
    return await Deno.readTextFile(`${getModuleDir(importMeta)}/input.txt`);
}

function getModuleDir(importMeta: ImportMeta): string {
    return path.resolve(path.dirname(path.fromFileUrl(importMeta.url)));
}

export function getLineSeparator(){
    return mod.platform() === 'win32' ? '\r\n' : '\n';
}