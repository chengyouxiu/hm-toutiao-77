// 引入axios
import axios from 'axios'
import store from '@/store'
// 配置axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.headers = {
  Authorization: `Bearer ${store.getUser().token}`
}

// 导出axios
export default axios
