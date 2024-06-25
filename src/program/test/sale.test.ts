import {expect, test} from "vitest";
import {calculate} from "../sale0.0.2.ts";
import fs from "fs";
import csv from "csv-parser";
const classes: string[] = ["boundary_foundation", "boundary_robust", "boundary_worst",
    "strong_normal","decision", "total"];
let results: { [key: string]: any[] };
results = {};
// 读取CSV文件并解析数据
await new Promise((resolve, reject) => {
    classes.forEach(e=> {
        const res:any[]=[]
        fs.createReadStream('src/testCase/sale_'+e+'.csv')
            .pipe(csv({
                headers: ["No", "Computer Sales", "Monitor Sales", "Peripherals Sales", "Result"],
                skipLines: 1
            }))
            .on('data', (data: any) => res.push(data))
            .on('end', resolve)
            .on('error', reject);
        results[e]=res
    })
});
classes.forEach(e=> {
    let cnt = 1
    results[e].forEach((tc) => {
        const cs = tc["Computer Sales"]
        const ms = tc["Monitor Sales"]
        const ps = tc["Peripherals Sales"]
        const result = tc["Result"]
        test('Computer Sale System Test '+e +" "+(cnt++), async () => {
            expect(String(calculate(cs, ms, ps))).toBe(result)
        })
    })
})