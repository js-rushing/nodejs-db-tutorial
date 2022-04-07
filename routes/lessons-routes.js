const express = require('express')
const LessonsDB = require('../models/dbHelpers')

const router = express.Router()

// Add new lesson
router.post('/', (req, res) => {
    LessonsDB.add(req.body)
      .then((lesson) => {
        return res.status(200).json(lesson)
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ message: 'cannot add lesson' })
      })
  })
  
  // Find all lessons from lessons table
  router.get('/', (req, res) => {
    LessonsDB.find()
      .then((lessons) => {
        return res.status(200).json(lessons)
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ message: 'Unable to retrieve lessons' })
      })
  })
  
  // Find single lesson by id
  router.get('/:id', (req, res) => {
    const { id } = req.params
  
    LessonsDB.findById(id)
      .then((lesson) => {
        if (lesson) {
          return res.status(200).json(lesson)
        } else {
          return res.status(404).json({ message: 'Record not found' })
        }
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ message: 'Unable to retrieve lesson' })
      })
  })
  
  // Delete single lesson by id
  router.delete('/:id', (req, res) => {
    const { id } = req.params
  
    LessonsDB.remove(id)
      .then((count) => {
        if (count > 0) {
          return res.status(200).json({ message: 'Record deleted' })
        } else {
          return res.status(404).json({ message: 'Record not found' })
        }
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ message: 'Unable to delete record' })
      })
  })
  
  // Update single lesson by id
  router.patch('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
  
    LessonsDB.update(id, changes)
      .then((lesson) => {
        if (lesson) {
          return res.status(200).json(lesson)
        } else {
          return res.status(404).json({ message: 'Record not found' })
        }
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ message: 'Unable to perform update' })
      })
  })
  
  // MESSAGES
  // Add message
  router.post('/:id/messages', (req, res) => {
    const { id } = req.params
    const msg = req.body
  
    if (!msg.lesson_id) {
      msg['lesson_id'] = parseInt(id, 10)
    }
  
    LessonsDB.findById(id)
      .then((lesson) => {
        if (!lesson) {
          return res.status(404).json({ message: 'Invalid id' })
        }
  
        // Check for required fields
        if (!msg.sender || !msg.text) {
          return res
            .status(400)
            .json({ message: 'Must provide both Sender and Text values' })
        }
  
        LessonsDB.addMessage(msg, id)
          .then((message) => {
            if (message) {
              return res.status(200).json(message)
            }
          })
          .catch((error) => {
            console.log(error)
            return res.status(500).json({ message: 'Failed to add message' })
          })
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ message: 'Error finding lesson' })
      })
  })
  
  // Get all messages
  router.get('/:id/messages', (req, res) => {
    const { id } = req.params
  
    LessonsDB.findLessonMessages(id)
      .then((messages) => {
        if (messages) {
          return res.status(200).json(messages)
        }
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ message: 'Error retrieving messages' })
      })
  })

  module.exports = router