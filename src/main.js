import Vue from 'vue'
import App from './App.vue'
// 在控制台的提示信息  productionTip = false生成换环境提示为false
Vue.config.productionTip = false

// 跟实力 mount挂载到某个位置
new Vue({
  render: h => h(App)
}).$mount('#app')
