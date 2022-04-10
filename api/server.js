const express = require('express')
const morgan = require('morgan') // log requests
const helmet = require('helmet') // secure app by setting various HTTP headers - hide stack info
const cors = require('cors')

/* COOKIES */
// const session = require('express-session')

const authRouter = require('../auth/auth-routes')
const lessonsRouter = require('../routes/lessons-routes')
const messagesRouter = require('../routes/messages-routes')
const usersRouter = require('../routes/users-routes')

const server = express()

/*  COOKIES */
// const sessionConfig = {
//     name: 'monster', // cookie name
//     secret: process.env.SECRET, // cookie secret
//     cookie: {
//         maxAge: 1000 * 60 * 60, // cookie expiration timeout
//         secure: false, // for production set to true for https only access
//         httpOnly: true, // true means no access from javaScript
//     },
//     resave: false,
//     saveUninitialized: true, // GDPR laws - must be set to false for production to require consent for saving cookie
// }

const restricted = require('../auth/restricted-middleware')

server.use(helmet()) // secure app by setting various HTTP headers
server.use(morgan('dev')) // log requests
server.use(cors())
server.use(express.json())

/* COOKIES*/
// server.use(session(sessionConfig))

server.get('/', (req, res) => {
  return res.status(200).json({ message: 'Computers, man.  Computers.' })
})

server.use('/api/auth', authRouter)
server.use('/api/lessons', restricted, lessonsRouter)
server.use('/api/messages', restricted, messagesRouter)
server.use('/api/users', restricted, usersRouter)

module.exports = server
