<script setup lang="ts">


import Pannel from "../PannelTemplate.vue";
import type {CascaderProps} from "ant-design-vue";
import {ref} from "vue";

const versions = ['0.0.1', '0.0.2']

const code = `function calendar(year: number, month: number, day: number): string {
    if (year < 1900 || year > 2100) {
        return ''
    }

    if (month < 1 || month > 12) {
        return ''
    }

    const monthDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let isRun: boolean = false

    if (year % 100 != 0 && year % 4 == 0) {
        isRun = true
    } else if (year % 400 == 0) {
        isRun = true
    }

    if (isRun) {
        monthDays[2 - 1] ++
    }

    if (day < 1 || day > monthDays[month - 1]) {
        return ''
    }

    if (day === monthDays[month - 1] && month != 12) {
        day = 1
        month = month + 1
    } else if (day === monthDays[month - 1] && month === 12) {
        day = 1
        month = 1
        year = year + 1
    }

    return year + '-' + month + '-' + day
}`

const TestCases: CascaderProps['options'] = [
  {
    value: 'boundary',
    label: '边界值',
    children: [
      {
        value: 'foundational',
        label: '基本边界值',
      },
      {
        value: 'robust',
        label: '健壮边界值',
      },
      {
        value: 'worst',
        label: '最坏边界值',
      },
    ],
  },
  {
    value: 'equivalent_class',
    label: '等价类',
    children: [
      {
        value: 'weak_normal',
        label: '弱一般等价类',
      },
      {
        value: 'strong_normal',
        label: '强一般等价类',
      },
      {
        value: 'weak_robust',
        label: '弱健壮等价类',
      },
      {
        value: 'strong_robust',
        label: '强健壮等价类',
      },
    ],
  },
  {
    value: 'decision_table',
    label: '决策表',
  },
];

const TestResultIndex = ref<number>(0)

</script>

<template>
  <Suspense>
    <pannel problem="万年历" :versions="versions" :code="code" :test-cases="TestCases" :test-result-index="TestResultIndex">
    <template #header>
      Question 02. 万年历问题
    </template>
    <template #sub-title>
      算法思想
    </template>
    <template #detail>
      输入变量为年份、月份和日期。对于首先对于年份和月份进行合法性判断，随后根据年月对日期进行判定，最后推算下一日的日期。
      <ol>
        <li>判断年份是否在正常取值范围内（1900 ≤ year ≤ 2100）；</li>
        <li>判断月份是否在正常取值范围内（1 ≤ month ≤ 12）；</li>
        <li>校验当前月份的monthDays是否符合常识，然后判断输入日期是否在取值范围内（1 ≤ day ≤ monthDays）；</li>
        <li>计算下一天的日期，注意跨月或跨年的特殊情况。</li>
      </ol>
    </template>
  </pannel>
  </Suspense>
</template>

<style scoped>
</style>