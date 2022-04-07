const express = require('express')
const LessonsDB = require('../models/dbHelpers')

const router = express.Router()

// Delete message
router.delete('/:id', (req, res) => {
    const { id } = req.params
  
    LessonsDB.removeMessage(id)
      .then((count) => {
        if (count > 0) {
          return res
            .status(200)
            .json({ message: `Message with id: ${id} successfully deleted` })
        } else {
          return res
            .status(404)
            .json({ message: `Message with id: ${id} not found` })
        }
      })
      .catch((error) => {
        console.log(error)
        return res.status(500).json({ message: 'Error deleting message' })
      })
  })

  module.exports = router