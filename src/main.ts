import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import './assets/styles/common.css'
import './assets/styles/icon.css'
import App from './App.vue'
import router from './router'
import store from './store'

// import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const app = createApp(App)
app.use(ElementPlus)
// app.use(MdEditor)
app.use(router)
app.use(store)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
