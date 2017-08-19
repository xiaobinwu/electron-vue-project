const Message = require('./models/message')
const multiparty = require('multiparty')
module.exports = function (app) {
    // 信息
    app.post('/message', function (req, res) {
        var id = req.body.roomid
        // 获取历史信息
        Message.find({ roomid: id }).sort({ 'time': -1 }).limit(80).exec(function (err, message) {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    status: 0,
                    data: message.reverse()
                })
            }
        })
    })
    // 上传图片
    app.post('/file/uploadimg', function (req, res, next) {
        // console.log(req.body)
        // console.log(req.header)
        const form = new multiparty.Form({
            uploadDir: './static/files/', // 设置文件储存目录
            maxFilesSize: 2 * 1024 * 1024 // 设置单文件大小限制
        })
        // 上传完成后处理
        form.parse(req, function (err, fields, files) {
            console.log(fields)
            console.log(files)
        })
    })
}