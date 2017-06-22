//  HTML5 Notification API
export const createNotification = function (options) {
    const myNotification = new Notification(options.title, {
        body: options.body
    })
    myNotification.onclick = () => {
        options.callback && options.callback()
    }
}
