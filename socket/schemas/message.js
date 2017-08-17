// 引入mongoose
const mongoose = require('mongoose')
// 聊天记录模型
const MessageSchema = new mongoose.Schema({
    username: String,
    store: String,
    storeid: String,
    src: String,
    msg: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default: ''
    },
    roomid: String,
    time: {
        type: Date,
        default: Date.now()
    }
})

module.exports = MessageSchema