<script setup lang="ts">

import Pannel from "../PannelTemplate.vue";
import type {CascaderProps} from "ant-design-vue";
import {ref} from "vue";

const versions = ['0.0.1', '0.0.2']


const code = `function triangleType(a: number, b: number, c: number): string {
    if (a < 1 || b < 1 || c < 1 || a > 256 || b > 256 || c > 256) {
        return '非三角形';
    }
    if (a >= b + c || b >= a + c || c >= a + b) {
        return '非三角形';
    }
    if (a === b && b === c) {
        return '等边三角形';
    }
    if (a === b || b === c || a === c) {
        return '等腰三角形';
    }
    return '普通三角形';
}`;



const TestCases: CascaderProps['options'] = [
  {
    value: 'boundary',
    label: '边界值',
    children: [
      {
        value: 'robust',
        label: '强壮边界值',
      }
    ],
  },
  {
    value: 'equivalent_class',
    label: '等价类',
    children: [
      {
        value: 'weak_robust',
        label: '弱健壮等价类',
      }
    ],
  },
  {
    value: 'total',
    label: '总测试用例',
  },
];

const TestResultIndex = ref<number>(3);

</script>

<template>
  <Suspense>
    <pannel problem="三角形类型判断" :versions="versions" :code="code" :test-cases="TestCases" :test-result-index="TestResultIndex">
      <template #header>
        Question 01. 三角形类型判断问题
      </template>
      <template #sub-title>
        算法思想
      </template>
      <template #detail>
        输入变量为三个边长（a, b, c）。首先根据三角形两边之和大于第三边的原则来判断是否能构成三角形。若能，进一步判断是等边、等腰还是普通三角形。
        <ol>
          <li>验证输入的边长是否在合法范围内（1 ≤ a, b, c ≤ 256）；</li>
          <li>检查三条边是否满足三角形的形成条件；</li>
          <li>判断三角形的类型（等边、等腰、普通）。</li>
        </ol>
      </template>
    </pannel>
  </Suspense>
</template>

<style scoped>
</style>