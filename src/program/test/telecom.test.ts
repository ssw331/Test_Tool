import { expect, test } from "vitest";
import { telecom } from "../telecom0.0.1.ts";
import fs from "fs";
import csv from "csv-parser";

// test("telecom", async () => {
//     expect(telecom(1, 0)).toBe(25.1485)
// })

test('telecom tests', async () => {
    const results = [];

    // 读取CSV文件并解析数据
    await new Promise((resolve, reject) => {
        fs.createReadStream('src/testCase/telecom.csv')
            .pipe(csv({ headers: ['monthlyMinutes', 'overduePayments', 'result'], skipLines: 1 }))
            .on('data', (data) => results.push(data))
            .on('end', resolve)
            .on('error', reject);
    });

    // 遍历数组生成测试用例
    results.forEach((row) => {
        const param1 = parseFloat(row['monthlyMinutes']);  // 第一列
        const param2 = parseFloat(row['overduePayments']);  // 第二列
        const expected = parseFloat(row['result']); // 第三列


        expect(telecom(param1, param2)).toBe(expected);

    });
});
