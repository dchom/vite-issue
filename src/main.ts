import { createApp } from 'vue'
import App from './App.vue'

import './assets/font/iconfont.css'
import './assets/style/base.less'

import 'virtual:windi.css'
// dayjs
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import VueViewer from 'v-viewer'

import { registerRouter } from '@/route'

import { registerStore } from '@/store'

// 创建应用
const app = createApp(App)
dayjs.locale('zh-cn')
registerRouter(app)
registerStore(app)

app.use(VueViewer)

app.mount('#app')
