const express = require('express')

const lessonsRouter = require('../routes/lessons-routes')
const messagesRouter = require('../routes/messages-routes')

const server = express()

server.use(express.json())

server.use('/api/lessons', lessonsRouter)
server.use('/api/messages', messagesRouter)

module.exports = server