<script setup lang="ts">

import {reactive, ref} from "vue";
import { NCode, NConfigProvider } from 'naive-ui'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
// import {expect, onTestFinished, TaskResult, test} from "vitest";
// import {sum} from "../program/sum.ts";

interface FormState {
  programVer: string;
  testCase: string;
}

hljs.registerLanguage('javascript', javascript)

const code = `function sum(a : number, b : number)
{
    return a + b
}
`

const props = defineProps({
  problem: String,
  versions: Array,
})

// const testResult = ref<TaskResult>()

const tabListNoTitle = [
  {
    key: 'problem',
    tab: '问题描述',
  },
  {
    key: 'result',
    tab: '测试结果',
  },
  {
    key: 'visible',
    tab: '可视化',
  },
];

const noTitleKey = ref('problem');

const onTabChange = (value: string, type: string) => {
  console.log(value, type);
  if (type === 'noTitleKey') {
    noTitleKey.value = value;
  }
};

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const formState = reactive<FormState>({
  programVer: '',
  testCase: '',
});
const onFinish = (values: any) => {
  console.log('Success:', values);
  // test("adds 1 + 2", async () => {
  //   expect(sum(1, 2)).toBe(3)
  //   onTestFinished((e) => {
  //     testResult.value = e
  //   })
  // })
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <a-row style="height: 90%;">
    <a-col :span="16">
      <a-card
          style="height: 100%; width: auto; margin: 5px 2px 5px 5px"
          :tab-list="tabListNoTitle"
          :active-tab-key="noTitleKey"
          @tabChange="(key: string) => onTabChange(key, 'noTitleKey')"
      >
        <p v-if="noTitleKey === 'problem'">
          {{ props.problem }}
<!--          <router-view/>-->
          <n-config-provider :hljs="hljs">
            <n-code
                :code="code"
                language="Javascript"
                inline
            ></n-code>
          </n-config-provider>
        </p>
        <p v-else-if="noTitleKey === 'result'"></p>
        <p v-else-if="noTitleKey === 'visible'">project content</p>
        <!--    <template #tabBarExtraContent>-->
        <!--      <a href="#">More</a>-->
        <!--    </template>-->
      </a-card>
    </a-col>
    <a-col :span="8">
      <a-card
          style="height: 100%; width: auto; margin: 5px 5px 5px 2px; padding: 2px"
          title="程序与测试集选择"
      >
        <a-form
            :model="formState"
            name="validate_other"
            v-bind="formItemLayout"
            @finishFailed="onFinishFailed"
            @finish="onFinish"
        >
          <b> 程序版本 </b>
          <a-form-item
              style="justify-content: center; padding-top: 10px;"
              name="programVer"
              has-feedback
              :rules="[{ required: true, message: 'Please select program version!' }]"
          >
            <a-select v-model:value="formState.programVer" placeholder="Please select program version">
<!--              <a-select-option value="0.0.1">{{  }}</a-select-option>-->
<!--              <a-select-option value="0.0.2">0.0.2</a-select-option>-->
              <a-select-option v-for="item in props.versions" :value="item">{{ item }}}</a-select-option>
            </a-select>
          </a-form-item>
          <b> 测试用例集 </b>
          <a-form-item
              style="justify-content: center; padding-top: 10px;"
              name="testCase"
              has-feedback
              :rules="[{ required: true, message: 'Please select test case!' }]"
          >
            <a-select v-model:value="formState.testCase" placeholder="Please select test case">
              <a-select-option value="china">China</a-select-option>
              <a-select-option value="usa">U.S.A</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
              style="justify-content: center; padding-top: 10px;"
          >
            <a-button type="primary" html-type="submit">Submit</a-button>
          </a-form-item>
        </a-form>
        <!--    <template #tabBarExtraContent>-->
        <!--      <a href="#">More</a>-->
        <!--    </template>-->
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>

</style>