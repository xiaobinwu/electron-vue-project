/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) { return }
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = (name) => {
    if (!name) { return }
    return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = (name) => {
    if (!name) { return }
    window.localStorage.removeItem(name)
}

/**
 * 操作快捷菜单设置的storage
 */
export const setFastMenuStore = (flag, text, _this) => {
    let fastMenus = JSON.parse(getStore('fastMenus')) || {}
    if (flag) {
        fastMenus[_this.$route.fullPath] = text
    } else {
        delete fastMenus[_this.$route.fullPath]
    }
    setStore('fastMenus', fastMenus)
}