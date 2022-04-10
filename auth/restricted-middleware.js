const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  /* COOKIES */
  // console.log(req.session)
  // if (req.session && req.session.user) {
  //     next()
  // } else {
  //     return res.status(401).json({ message: 'Must be logged in'})
  // }

  /* JWT */
  const token = req.headers.authorization
  const secret = process.env.SECRET

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' })
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    return res.status(401).json({ message: 'No token received' })
  }
}
