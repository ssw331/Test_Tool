<script setup lang="ts">


import Pannel from "../PannelTemplate.vue";
import type {CascaderProps} from "ant-design-vue";
import {ref} from "vue";

const versions = ['0.0.1']

const code = `function calculateTotalFee(monthlyMinutes: number, overduePayments: number): number {
    // 基本月租费
    const baseFee = 25;
    // 每分钟通话费
    const perMinuteFee = 0.15;

    // 通话时间段的最大容许不按时缴费次数和折扣率
    const discountRates = [
        { maxMinutes: 60, maxOverdue: 1, discount: 0.01 },
        { maxMinutes: 120, maxOverdue: 2, discount: 0.015 },
        { maxMinutes: 180, maxOverdue: 3, discount: 0.02 },
        { maxMinutes: 300, maxOverdue: 3, discount: 0.025 },
        { maxMinutes: 43000, maxOverdue: 6, discount: 0.03 }
    ];
    if(monthlyMinutes>43000||monthlyMinutes<0||overduePayments<0||overduePayments>11){
        return -1;
    }
    // 计算实际通话费
    const actualCallFee = monthlyMinutes * perMinuteFee;
    let discount = 0;

    // 确定折扣率
    for (const rate of discountRates) {
        if (monthlyMinutes <= rate.maxMinutes) {
            if (overduePayments <= rate.maxOverdue) {
                discount = rate.discount;
            }
            break;
        }
    }

    // 计算折扣后的通话费
    const discountedCallFee = actualCallFee * (1 - discount);

    // 总费用 = 基本月租费 + 折扣后的实际通话费
    const totalFee = baseFee + discountedCallFee;

    return totalFee;
}`

const TestCases: CascaderProps['options'] = [
  {
    value: 'total',
    label: '总测试用例',
  },
];


// 定义表格数据
const tableData = ref([
  {range: '0 < 通话时间 ≤ 60', maxOverdue: 1, discount: '1.0%'},
  {range: '60 < 通话时间 ≤ 120', maxOverdue: 2, discount: '1.5%'},
  {range: '120 < 通话时间 ≤ 180', maxOverdue: 3, discount: '2.0%'},
  {range: '180 < 通话时间 ≤ 300', maxOverdue: 3, discount: '2.5%'},
  {range: '300 < 通话时间', maxOverdue: 6, discount: '3.0%'},
]);

const TestResultIndex = ref<number>(2)
</script>

<template>
  <Suspense>
    <pannel problem="电信收费" :versions="versions" :code="code" :test-cases="TestCases" :test-result-index="TestResultIndex">
      <template #header>
        Question 03. 电信收费问题
      </template>
      <template #sub-title>
        算法思想
      </template>
      <template #detail>
        输入变量通话时间和本年度未按时缴费次数。
        每月的电话总费用=基本月租费+折扣后的实际的通话费，如果没有折扣则按实际通话费计算，基本月租费为25元，每分钟通话费为0.15元。
        实际通话费是否有折扣与当月的通话时间（分钟）和本年度至本月的累计未按时缴费的次数有关。
        当月的通话分钟数和折扣比例及本年度未按时缴费次数之间有直接的对应关系，如果本年度的未按时缴费的次数超过本月通话时间所对应的容许值则免于折扣，并按实际的通话费计算。
        <div>
          <hr>
          <h3>通话时间和折扣比例及未按时缴费次数的关系</h3>
          <table>
            <thead>
            <tr>
              <th>本月通话的分钟数</th>
              <th>通话时间段的最大容许不按时缴费次数</th>
              <th>通话时间段的折扣率</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>{{ item.range }}</td>
              <td>{{ item.maxOverdue }}</td>
              <td>{{ item.discount }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <ol>
          <li>首先根据通话时间找到容许的最大未按时缴费次数</li>
          <li>判断本年度未按时缴费次数是否超限</li>
          <li>选择折扣值</li>
          <li>计算电话费</li>
        </ol>
      </template>
    </pannel>
  </Suspense>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px 12px;
  text-align: center;
}

th {
  background-color: #f4f4f4;
}
</style>