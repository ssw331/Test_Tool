import { createApp } from 'vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router/index'

createApp(App).use(Antd).use(router).mount('#app')

import axios from 'axios'
interface TestResult
{
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
    "testResults":
        {
            "assertionResults":
                {
                    "ancestorTitles": string[],
                    "fullName": string,
                    "status": string,
                    "title": string,
                    "duration": number,
                    "failureMessages": string[]
                }[]
            ,
            "startTime": number,
            "endTime": number,
            "status": string,
            "message": string,
            "name": string
        }[]
}
const JsonParser = async (url: string): Promise<TestResult> => {
    return await axios.get(url).then(r => {
        return r.data
    })
}
console.log(await JsonParser("/src/js-report.json"))