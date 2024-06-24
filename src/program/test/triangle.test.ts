import { expect, test } from "vitest";
import fs from "fs";
import csv from "csv-parser";
import { triangleType } from "../triangle0.0.1.ts";

const classes: string[] = ["boundary_robust", "equivalent_class_weak_robust"];

let results: { [key: string]: any[] } = {};

// 读取CSV文件并解析数据
await new Promise((resolve, reject) => {
    classes.forEach((e) => {
        const res: any[] = [];
        fs.createReadStream(`src/testCase/triangle_${e}.csv`)
            .pipe(csv({headers: ['Id', 'A', 'B', 'C', '输出'], skipLines: 1}))
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
        const param1 = parseInt(row['A']);
        const param2 = parseInt(row['B']);
        const param3 = parseInt(row['C']);
        const expected = row['输出'];
        test("triangle test " + e + " " + (cnt++), async () => {
            expect(triangleType(param1, param2, param3)).toBe(expected);
        });
    });
});