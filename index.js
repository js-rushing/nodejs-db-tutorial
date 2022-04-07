require('dotenv').config()
const server = require('./api/server')

const port = process.env.PORT || 5000

// Start server
server.listen(port, () => {
  console.log(`Server running on PORT: ${port}`)
})
