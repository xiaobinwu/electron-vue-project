//  当前时间
export const getNowFormatDate = function () {
    const date = new Date()
    const seperator1 = '-'
    const seperator2 = ':'
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) {
        month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
    }
    const currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
    return currentdate
}
