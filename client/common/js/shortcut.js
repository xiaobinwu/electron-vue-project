export default {
    // 绑定按键说明
    keyCodeDes: function (el) {
        let ul = document.createElement('ul')
        let fragment = document.createDocumentFragment()
        this.keyCodeArr.forEach((item) => {
            let li = document.createElement('li')
            li.textContent = `${item.keyDec}【${item.key}】`
            fragment.appendChild(li)
        })
        ul.appendChild(fragment)
        el.appendChild(ul)
    },
    // 初始化
    init: function (options) {
        this.keyCodeArr = options.keyCodeArr
        if (!!options.wrapEle) {
            this.keyCodeDes(options.wrapEle)
        }
        document.addEventListener('keydown', (event) => {
            const e = event || window.event
            const keycode = this.keyCodeArr.filter((item) => {
                return item.keyCode === e.keyCode
            })
            // 阻止浏览器默认事件
            if (keycode.length > 0) {
                if (e.preventDefault) {
                    e.preventDefault()
                } else {
                    e.returnValue = false
                    e.keyCode = 0
                }
                keycode[0].callback && keycode[0].callback()
                return false
            }
        }, false)
        window.onhelp = function () { return false }
    },
    // 获取按键数组
    getBindCodes: function () {
        return this.keyCodeArr
    }
}