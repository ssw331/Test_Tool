import { createApp } from 'vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router/index'

createApp(App).use(Antd).use(router).mount('#app')
