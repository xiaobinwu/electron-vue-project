const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000

server.listen(port, function () {
  console.log('Server listening at port %d', port)
})

// 后期删除，静态资源
app.use(express.static('./node_modules'))

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' })
    socket.on('my other event', function (data) {
        console.log(data)
    })
})