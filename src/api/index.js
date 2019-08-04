// 引入axios
import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 配置axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
// config === axios.defaults配置项
// 请求拦截器
axios.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use((res) => {
  return res
}, (err) => {
  if (err.response.status === 401) {
    // 方式一
    // location.hash = '#/login'
    // 方式二
    router.push('/login')
  }
  return Promise.reject(err)
})
// 导出axios
export default axios
