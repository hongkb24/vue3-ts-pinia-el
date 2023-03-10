import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { mock, mockEnv } from './appConfig'
import '@/styles/index.postcss' // 全局样式
import 'virtual:svg-icons-register'
import './permission'
import 'element-plus/theme-chalk/el-message.css' // message样式
import 'element-plus/theme-chalk/el-message-box.css' // message样式
import { EnvType } from './types/app'

createApp(App).use(createPinia()).use(router).mount('#app')
