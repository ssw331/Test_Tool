import {expect, test} from "vitest";
import {calculate} from "../sale0.0.1.ts";
import fs from "fs";
import csv from "csv-parser";

const TestCase:any[] = [];

// 读取CSV文件并解析数据
await new Promise((resolve, reject) => {
    fs.createReadStream('src/testCase/sale_total.csv')
        .pipe(csv({ headers: ["No","Computer Sales","Monitor Sales","Peripherals Sales","Result"], skipLines: 1 }))
        .on('data', (data: any) => TestCase.push(data))
        .on('end', resolve)
        .on('error', reject);
});

TestCase.forEach((tc) =>{
    const cs = tc["Computer Sales"]
    const ms = tc["Monitor Sales"]
    const ps = tc["Peripherals Sales"]
    const result = tc["Result"]
    test('Computer Sale System Test',async()=>{
        expect(String(calculate(cs,ms,ps))).toBe(result)
    })
})