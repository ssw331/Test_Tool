import { expect, test } from "vitest";
import { telecom } from "../telecom0.0.1.ts";
import fs from "fs";
import csv from "csv-parser";

const classes: string[] = ["boundary_robust", "equivalent_class_strong_robust", "decision","total"];

let results: { [key: string]: any[] } = {};

// 读取CSV文件并解析数据
await new Promise((resolve, reject) => {
    classes.forEach((e) => {
        const res: any[] = [];
        fs.createReadStream(`src/testCase/telecom_${e}.csv`)
            .pipe(csv({headers: ['monthlyMinutes', 'overduePayments', 'result'], skipLines: 1}))
            .on('data', (data: any) => res.push(data))
            .on('end', resolve)
            .on('error', reject);
        results[e] = res;
    });
});

classes.forEach((e) => {
    let cnt = 1;
    // 遍历数组生成测试用例
    results[e].forEach((row: any) => {
        const param1 = parseInt(row['monthlyMinutes']);
        const param2 = parseInt(row['overduePayments']);
        const expected = parseFloat(row['result']);
        test("telecom test " + e + " " + (cnt++), async () => {
            expect(telecom(param1, param2)).toBeCloseTo(expected, 2);
        });
    });
});
