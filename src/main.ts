import { createApp } from 'vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router/index'

createApp(App).use(Antd).use(router).mount('#app')

import axios from 'axios'
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
interface Result
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
    "testResults": TestResult[]
}
interface Column{
    title:string,
    key:string,
    dataIndex?:string
}
const Columns:Column[]=[
    {
        title:"title",
        key:"title",
        dataIndex:"title"
    },
    {
        title:"status",
        key:"status",
        dataIndex:"status"
    },
    {
        title:"duration",
        key:"duration",
        dataIndex:"duration"
    },
    {
        title:"failureMessages",
        key:"failureMessages",
        dataIndex:"failureMessages"
    }
]
interface Data{
    key:string,
    title:string,
    status:string,
    duration:number,
    failureMessages:string[]
}
class TableData{
    columns = Columns;
    data:Data[]=[]
}
const JsonParser = async (url: string): Promise<TableData> => {
    const r:Result =  (await axios.get(url)).data
    const testResults=r.testResults
    let ret=new TableData()
    let sum_j = 0
    for(let i=0;i<testResults.length;i=i+1)
    {
        let assertionResults = testResults[i].assertionResults
        for(let j:number=1;j<=assertionResults.length;j=j+1)
        {
            let assertionResult = assertionResults[j-1]
            ret.data.push({
                key: String(sum_j+j),
                title: assertionResult.title,
                status: assertionResult.status,
                duration: assertionResult.duration,
                failureMessages: assertionResult.failureMessages
            })
        }
        sum_j  = sum_j+assertionResults.length
    }
    return ret
}
console.log(await JsonParser("/src/js-report.json"))