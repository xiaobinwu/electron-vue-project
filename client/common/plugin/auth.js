import { getStore } from './storage'
// 登录状态验证
export const loggedIn = function () {
    const userInfo = JSON.parse(getStore('userInfo'))
    if ((Object.prototype.toString.call(userInfo) !== '[object Null]') && userInfo.username && userInfo.password) {
        return true
    }
    return false
}