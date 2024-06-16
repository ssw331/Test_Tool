import {expect, test} from "vitest";
import {telecom} from "../telecom0.0.1.ts";


test("telecom", async () => {
    expect(telecom(121,1)).toBe(42.787)
})