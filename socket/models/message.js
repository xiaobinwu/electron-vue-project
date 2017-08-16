const mongoose = require('mongoose')
const MessageSchema = require('../schemas/message')
const Message = mongoose.model('Message', MessageSchema)

module.exports = Message