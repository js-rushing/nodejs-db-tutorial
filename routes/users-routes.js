const express = require('express')
const LessonsDB = require('../models/dbHelpers')

const router = express.Router()

// Get all users
router.get('/', (req, res) => {
  LessonsDB.findAllUsers()
    .then((users) => {
      if (users) {
        return res.status(200).json(users)
      } else {
        return res.status(404).json({ message: 'Could not get users' })
      }
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json({ message: 'Error getting users' })
    })
})

// Get single user
router.get('/:username', (req, res) => {
  const { username } = req.params

  LessonsDB.findUserByUsername(username)
    .then((user) => {
      if (user) {
        return res.status(200).json(user)
      } else {
        return res.status(404).json({ message: 'User not found' })
      }
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json({ message: 'Error getting user' })
    })
})

module.exports = router
