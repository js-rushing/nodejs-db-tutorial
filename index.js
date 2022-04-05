const express = require('express')
const LessonsDB = require('./models/dbHelpers')

const server = express()

server.use(express.json())

const PORT = process.env.PORT || 5000

server.get('/', (req, res) => {
  return res.status(200).json({ message: 'hello' })
})

// Add new lesson
server.post('/api/lessons', (req, res) => {
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
server.get('/api/lessons', (req, res) => {
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
server.get('/api/lessons/:id', (req, res) => {
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
server.delete('/api/lessons/:id', (req, res) => {
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
server.patch('/api/lessons/:id', (req, res) => {
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

// Start server
server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})
