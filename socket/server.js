const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000

// 引入mongoose
let mongoose = require('mongoose')
// 用于异步回调
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/advisory', { useMongoClient: true })
const Message = require('./models/message')

server.listen(port, function () {
    console.log('Server listening at port %d', port)
})

// 后期删除，静态资源
app.use(express.static('./node_modules'))

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
    // 监听用户发布聊天内容
    socket.on('message', function (obj) {
        // 向所有客户端广播发布的消息
        const mess = {
            username: obj.username,
            store: obj.store,
            src: obj.src,
            msg: obj.msg,
            img: obj.img,
            time: obj.time
        }
        io.emit('message', mess)
        console.log(obj.username + '说：' + mess.msg)
        if (obj.img === '') {
            var message = new Message(mess)
            message.save(function (err, mess) {
                if (err) {
                    console.log(err)
                    return
                }
                console.log(mess)
            })
        }
    })
})