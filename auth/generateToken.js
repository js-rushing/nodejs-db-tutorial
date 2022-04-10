const jwt = require('jsonwebtoken')

module.exports = user => {
    // need 3 things to create token: payload, secret, & options

    const payload = {
        id: user.id,
        username: user.username
        // Can add more no confidential data
    }

    const secret = process.env.SECRET

    const options = {
        expiresIn: '1d' // 1 day
    }

    return jwt.sign(payload, secret, options)
}