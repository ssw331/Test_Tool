<script setup lang="ts">

import Pannel from "../PannelTemplate.vue";
import type {CascaderProps} from "ant-design-vue";
import {ref} from "vue";

const versions = ['0.0.1', '0.0.2']


const code = `
class Item
{
    constructor(p: number,msl: number) {
        this.Price = p
        this.MaxSaleLimit = msl
    }

    Price:number = 0
    MaxSaleLimit:number = 0
}
const Computer = new Item(25,70)
const Monitor=new Item(30,80)
const Peripheral = new Item(45,90)
const MinSaleLimit =1
const SaleStage1 = 1000
const SaleStage2 = 1800
const calculateSign = -1
const calculate = (computerSaleCount:number,monitorSaleCount:number,peripheralSaleCount:number):number|String =>{
    if (computerSaleCount == calculateSign)
        return "The Month's Total Sale"
    if (computerSaleCount < MinSaleLimit)
        return \`The sale count of computer cant be lower than \${MinSaleLimit}\`
    if (computerSaleCount > Computer.MaxSaleLimit)
        return \`The sale count of computer cant be higher than \${Computer.MaxSaleLimit}\`
    if (monitorSaleCount < MinSaleLimit)
        return \`The sale count of monitor cant be lower than \${MinSaleLimit}\`
    if (monitorSaleCount > Monitor.MaxSaleLimit)
        return \`The sale count of monitor cant be higher than \${Monitor.MaxSaleLimit}\`
    if (peripheralSaleCount < MinSaleLimit)
        return \`The sale count of peripheral device cant be lower than \${MinSaleLimit}\`
    if (peripheralSaleCount > Peripheral.MaxSaleLimit)
        return \`The sale count of peripheral device cant be higher than \${Peripheral.MaxSaleLimit}\`
    let totalSale = computerSaleCount * Computer.Price + monitorSaleCount * Monitor.Price + peripheralSaleCount * Peripheral.Price;
    if (totalSale <= SaleStage1)
        return totalSale * 0.1;
    else if (totalSale <= SaleStage2)
        return totalSale * 0.15;
    else
        return totalSale * 0.2;
}
`



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
        value: 'strong_normal',
        label: '强一般等价类',
      },
    ],
  },
  {
    value: 'decision',
    label: '决策表',
  },
  {
    value: 'total',
    label: '综合测试用例'
  }
];

const TestResultIndex = ref<number>(1);

</script>

<template>
  <Suspense>
    <pannel problem="电脑销售系统" :versions="versions" :code="code" :test-cases="TestCases" :test-result-index="TestResultIndex">
      <template #header>
        Question 04. 电脑销售系统问题
      </template>
      <template #sub-title>
        算法思想
      </template>
      <template #detail>
        输入变量为主机、显示器和外设的销量，计算得出销售员销售所得的佣金数额，每个销售员每月至少销售一台完整的机器，主机变量为-1表示统计销售员本月销售总额，当销售额小于等于1000时，按照10%提取佣金，当销售额大于1000并且小于等于1800时，按照15%提取佣金，当销售额大于1800时按照20%提取佣金
        <ol>
          <li>首先判断主机销量是否为-1，若是则特殊判断</li>
          <li>其次判断主机、显示器和外设的销量是否在范围内，每个的销量都应该大于一并且小于等于库存量</li>
          <li>最后根据销售的总价格计算得出佣金</li>
        </ol>
      </template>
    </pannel>
  </Suspense>
</template>

<style scoped>
</style>