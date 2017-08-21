const Message = require('./models/message')
const multiparty = require('multiparty')
const fs = require('fs')
// 需要更改成实际线上服务器
const socketUrl = 'http://localhost:3000'
module.exports = function (app, io) {
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
        const form = new multiparty.Form()

        form.encoding = 'utf-8'
        // 设置文件存储路径
        form.uploadDir = __dirname + '/static/files/'
        // 设置单文件大小限制
        form.maxFilesSize = 2 * 1024 * 1024

        // 上传完成后处理
        form.parse(req, function (err, fields, files) {
            const filesTmp = JSON.stringify(files, null, 2)
            console.log(filesTmp)
            console.log(fields)
            console.log(files)
            if (err) {
                console.log('parse error: ' + err)
                res.json({
                    status: 1
                })
            } else {
                const inputFile = files.file[0]
                const uploadedPath = inputFile.path
                const array = inputFile.originalFilename.split('.')
                const imgtype = array[array.length - 1]
                const relativePath = '/static/files/' + new Date().getTime() + '.' + imgtype
                const dstPath = __dirname + relativePath
                // 重命名为真实文件名
                fs.rename(uploadedPath, dstPath, function (err) {
                    if (err) {
                        console.log('rename error: ' + err)
                        res.json({
                            status: 1
                        })
                    } else {
                        const mess = {
                            username: fields.username[0],
                            src: fields.src[0],
                            img: socketUrl + relativePath,
                            msg: '',
                            roomid: fields.roomid[0],
                            storeid: fields.storeid[0],
                            store: fields.store[0],
                            time: new Date()
                        }
                        const message = new Message(mess)
                        message.save(function (err, mess) {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(mess)
                            }
                        })
                        console.log('rename ok')
                        // 向房间发送信息
                        io.to(mess.roomid).emit('message', mess)
                        res.json({
                            status: 0
                        })
                    }
                })
            }
        })
    })
}