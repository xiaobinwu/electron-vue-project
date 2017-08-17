const Message = require('./models/message')
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
}