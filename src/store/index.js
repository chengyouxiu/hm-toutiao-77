// 约定存储信息的key hm-toutiao-77-user
// 存储信息的值 用户的信息 字符串形式的json

const KEY = 'hm-toutiao-77-user'
export default {
  setUser (user) {
    // 存储用户信息到sessionStorage
    const localUser = this.getUser()
    const nowUser = { ...localUser, ...user }
    window.sessionStorage.setItem(KEY, JSON.stringify(nowUser))
  },
  getUser () {
    // 获取用户信息从sessionStorage
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
