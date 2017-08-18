const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000

// 设置跨域问题
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'content-type')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})

// post请求体解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 引入mongoose
let mongoose = require('mongoose')
// 用于异步回调
mongoose.Promise = require('bluebird')
global.db = mongoose.connect('mongodb://localhost:27017/advisory', { useMongoClient: true })
global.db.on('error', console.error.bind(console, '连接错误:'))
global.db.once('open', function () {
    console.log('Mongodb running')
})

// 定义全局users变量
global.users = {}

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
            roomid: obj.roomid,
            time: obj.time
        }
        io.to(mess.roomid).emit('message', mess)
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
    // 进入聊天室
    socket.on('enter', function (obj) {
        socket.name = obj.name
        socket.room = obj.roomid
        if (!(obj.roomid in global.users)) {
            global.users[obj.roomid] = {}
        }
        global.users[obj.roomid][obj.name] = obj
        socket.join(obj.roomid)
        io.to(obj.roomid).emit('enter', global.users[obj.roomid])
        console.log(obj.name + '加入了' + obj.roomid)
    })
    // 退出聊天室
    socket.on('out', function (obj) {
        delete  global.users[obj.roomid][obj.name]
        console.log(obj.name + '退出了' + obj.roomid)
        io.to(obj.roomid).emit('out', global.users[obj.roomid])
    })

})

// 接口
require('./route')(app)