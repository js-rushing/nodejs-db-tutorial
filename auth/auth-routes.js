const express = require('express')
const LessonsDB = require('../models/dbHelpers')
const bcrypt = require('bcryptjs')

const router = express.Router()

// Add new user
router.post('/register', (req, res) => {
  const credentials = req.body
  const { username, password } = credentials

  if (!(username && password)) {
    return res.status(400).json({ message: 'Username and password required' })
  }

  const hash = bcrypt.hashSync(credentials.password, 12)
  credentials.password = hash

  LessonsDB.addUser(credentials)
    .then((user) => {
      if (user) {
        return res.status(200).json(user)
      } else {
        return res.status(400).json({ message: 'Unable to add user' })
      }
    })
    .catch((error) => {
      console.log(error)
      if (error.errno == 19) {
        return res.status(400).json({ message: 'Username already in database' })
      } else {
        return res.status(500).json(error)
      }
    })
})

// Login user
router.post('/login', (req, res) => {
  const { username, password } = req.body

  if (!(username && password)) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  LessonsDB.findUserByUsername(username)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // Successful login
        req.session.user = {
          id: user.id,
          username: user.username,
        }

        return res.status(200).json({ message: `Welcome ${user.username}` })
      } else {
        return res.status(401).json({ message: 'Invalid credentials' })
      }
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json(error)
    })
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).json({ message: 'Error logging out' })
      } else {
        return res.status(200).json({ message: 'Successfully logged out' })
      }
    })
  } else {
    return res.status(200).json({ message: 'Already logged out' })
  }
})

module.exports = router
