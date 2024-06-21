<script setup lang="ts">

import {reactive, ref} from "vue";
import {NCode, NConfigProvider} from 'naive-ui'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import type {CascaderProps} from 'ant-design-vue';
import axios from 'axios'

interface FormState {
  programVer: string;
  testCase: string;
}

interface AssertionResult {
  "ancestorTitles": string[],
  "fullName": string,
  "status": string,
  "title": string,
  "duration": number,
  "failureMessages": string[]
}

interface TestResult {
  "assertionResults": AssertionResult[],
  "startTime": number,
  "endTime": number,
  "status": string,
  "message": string,
  "name": string
}

interface Result {
  "numTotalTestSuites": number,
  "numPassedTestSuites": number,
  "numFailedTestSuites": number,
  "numPendingTestSuites": number,
  "numTotalTests": number,
  "numPassedTests": number,
  "numFailedTests": number,
  "numPendingTests": number,
  "numTodoTests": number,
  "startTime": number,
  "success": boolean,
  "testResults": TestResult[]
}

interface Column {
  title: string,
  key: string,
  dataIndex?: string
}

const Columns: Column[] = [
  {
    title: "title",
    key: "title",
    dataIndex: "title"
  },
  {
    title: "status",
    key: "status",
    dataIndex: "status"
  },
  {
    title: "duration",
    key: "duration",
    dataIndex: "duration"
  },
  {
    title: "failureMessages",
    key: "failureMessages",
    dataIndex: "failureMessages"
  }
]

interface Data {
  key: string,
  title: string,
  status: string,
  duration: string,
  failureMessages: string[]
}

class TableData {
  columns = Columns;
  data: Data[] = []
}

const JsonParser = async (url: string, index: number): Promise<TableData> => {
  const r: Result = (await axios.get(url)).data
  const testResults = r.testResults
  let ret = new TableData()
  let sum_j = 0
  let assertionResults = testResults[index].assertionResults

  for (let j: number = 1; j <= assertionResults.length; j = j + 1) {
    let assertionResult = assertionResults[j - 1]
    ret.data.push({
      key: String(sum_j + j),
      title: assertionResult.title,
      status: assertionResult.status,
      duration: assertionResult.duration + 'ms',
      failureMessages: assertionResult.failureMessages
    })
    sum_j = sum_j + assertionResults.length
  }
  return ret
}

hljs.registerLanguage('typescript', typescript)

let code = `function sum(a : number, b : number)
{
    return a + b
}
`

const props = defineProps({
  testResultIndex: Number,
  versions: Array,
  code: String,
  testCases: Array,
})


const TestResult = ref<TableData>(await JsonParser("../src/js-report.json", <number>props.testResultIndex))
const DataSrc = ref<TableData>({
  data: [],
  columns: TestResult.value.columns,
})


let visible = ref<boolean>(false)

const loading = ref<boolean>(false)
const enterLoading = () => {
  // console.log(loading.value)
  loading.value = true
  setTimeout(() => {
    loading.value = false;
  }, 3000);
};

const tabListNoTitleByOne = [
  {
    key: 'problem',
    tab: '问题描述',
  },
];
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
];
const noTitleKey = ref('problem');
const onTabChange = (value: string, type: string) => {
  // console.log(value, type);
  if (type === 'noTitleKey') {
    noTitleKey.value = value;
  }
};
const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14},
};
const formState = reactive<FormState>({
  programVer: '',
  testCase: '',
});
const onFinish = (values: any) => {
      // console.log('Success:', values);
      // console.log(props.testCases?.length);
      if (props.testCases?.length! > 1) {
        TestResult.value?.data.forEach((each: any) => {
          // console.log(each.title.includes(values.testCase[0] +'_' + values.testCase[1]));
          if (each.title.includes(values.testCase[0] + '_' + values.testCase[1])) {
            DataSrc.value?.data.push(each);
          }
        })
      } else {
        TestResult.value?.data.forEach((each: any) => {
          // console.log(each.title.includes(values.testCase[0] +'_' + values.testCase[1]));
          DataSrc.value?.data.push(each);
        })
      }
      setTimeout(() => {
        visible.value = true
      }, 1000);
    }
;
const onFinishFailed = (errorInfo: any) => {
  // console.log('Failed:', errorInfo);
  visible.value = false
};
</script>

<template>
  <a-row style="height: 90%;">
    <a-col :span="16">
      <a-card
          v-if="!visible"
          style="height: 100%; width: auto; margin: 5px 2px 5px 5px"
          :tab-list="tabListNoTitleByOne"
          :active-tab-key="noTitleKey"
          @tabChange="(key: string) => onTabChange(key, 'noTitleKey')"
      >
        <p v-if="noTitleKey === 'problem'">
          <a-card :bordered="false">
            <template #title>
              <slot name="header">
                0.0 问题
              </slot>
            </template>
            <p>
              <slot name="sub-title">
                问题描述 / 算法思想
              </slot>
            </p>
            <p>
              <slot name="detail">
                so,so,so
              </slot>
            </p>
            <p>
              代码实现
            </p>
            <n-config-provider :hljs="hljs">
              <n-code
                  v-if="props.code === undefined || props.code.length === 0"
                  :code="code"
                  language="ts"
                  show-line-numbers
              ></n-code>
              <n-code
                  v-else
                  :code="props.code"
                  language="ts"
                  show-line-numbers
              ></n-code>
            </n-config-provider>
          </a-card>
        </p>
      </a-card>

      <a-card
          v-else
          style="height: 100%; width: auto; margin: 5px 2px 5px 5px"
          :tab-list="tabListNoTitle"
          :active-tab-key="noTitleKey"
          @tabChange="(key: string) => onTabChange(key, 'noTitleKey')"
      >
        <p v-if="noTitleKey === 'problem'">
          <a-card :bordered="false">
            <template #title>
              <slot name="header">
                0.0 问题
              </slot>
            </template>
            <p>
              <slot name="sub-title">
                问题描述 / 算法思想
              </slot>
            </p>
            <p>
              <slot name="detail">
                so,so,so
              </slot>
            </p>
            <p>
              代码实现
            </p>
            <n-config-provider :hljs="hljs">
              <n-code
                  v-if="props.code === undefined || props.code.length === 0"
                  :code="code"
                  language="ts"
                  show-line-numbers
              ></n-code>
              <n-code
                  v-else
                  :code="props.code"
                  language="ts"
                  show-line-numbers
              ></n-code>
            </n-config-provider>
          </a-card>
        </p>
        <p v-else-if="noTitleKey === 'result'">
          <a-table :data-source="DataSrc.data" :columns="TestResult.columns"/>
        </p>
        <p v-else-if="noTitleKey === 'visible'"></p>
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
              <a-select-option v-for="item in props.versions" :value="item">{{ item }}</a-select-option>
            </a-select>
          </a-form-item>
          <b> 测试用例集 </b>
          <a-form-item
              style="justify-content: center; padding-top: 10px;"
              name="testCase"
              has-feedback
              :rules="[{ required: true, message: 'Please select test case!' }]"
          >
            <a-cascader
                v-if="props.testCases === undefined || props.testCases.length === 0"
                v-model:value="formState.testCase"
                :options="TestCases"
            />
            <a-cascader
                v-else
                v-model:value="formState.testCase"
                :options="props.testCases"
            />
          </a-form-item>
          <a-form-item
              style="justify-content: center; padding-top: 10px;"
          >
            <a-button type="primary" html-type="submit" @click="enterLoading" :loading="loading">Submit</a-button>
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