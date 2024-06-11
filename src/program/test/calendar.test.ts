import {expect, test} from "vitest";
import {calendar} from "../calendar0.0.1.ts";

test("calendar", async () => {
    expect(calendar(1901, 12, 31)).toBe('1902-1-1')
})