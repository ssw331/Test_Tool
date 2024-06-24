import {expect, test} from "vitest";
import fs from "fs";
import csv from "csv-parser";
import {calendar} from "../calendar0.0.2.ts";

const classes: string[] = ["boundary_foundational", "boundary_robust", "boundary_worst",
    "equivalent_class_weak_normal", "equivalent_class_strong_normal", "equivalent_class_weak_robust",
    "equivalent_class_strong_robust", "decision", "total"];

let results: { [key: string]: any[] };
results = {};

// 读取CSV文件并解析数据
await new Promise((resolve, reject) => {
    classes.forEach((e) => {
        const res: any[] = []
        fs.createReadStream('src/testCase/calendar_' + e + '.csv')
            .pipe(csv({headers: ['Id', 'Y', 'M', 'D', '输出'], skipLines: 1}))
            .on('data', (data: any) => res.push(data))
            .on('end', resolve)
            .on('error', reject);
        results[e] = res
    })
});

classes.forEach((e) => {
    let cnt = 1
    // 遍历数组生成测试用例
    results[e].forEach((row: any) => {
        const param1 = parseInt(row['Y']);
        const param2 = parseInt(row['M']);
        const param3 = parseInt(row['D']);
        const expected = row['输出'];

        test("calendar test " + e + " " + (cnt++), async () => {
            expect(calendar(param1, param2, param3)).toBe(expected)
        })
    });
})
