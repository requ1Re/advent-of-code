import { expect } from "jsr:@std/expect";
import { getInput } from "../../util.ts";
import { solve } from "./solution.ts";

Deno.test("[Day 9] Example input", async (t) => {
    await t.step("Part 1", async () => {
        const input = await getInput(import.meta, true);
        expect(solve(input)).toBe(1928);
    })

    // await t.step("Part 2", async () => {
    //     const input = await getInput(import.meta, true);
    //     const lines = input.split(getLineSeparator())

    //     expect(solve(lines, ['+', '*', '|'])).toBe(11387);
    // })
});