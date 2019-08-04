import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.less'

import router from '@/router'
import axios from 'axios'
Vue.prototype.$http = axios
// 在控制台的提示信息  productionTip = false生成换环境提示为false
Vue.config.productionTip = false
Vue.use(ElementUI)

// 跟实力 mount挂载到某个位置
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
