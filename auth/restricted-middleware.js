module.exports = (req, res, next) => {
    console.log(req.session)
    if (req.session && req.session.user) {
        next()
    } else {
        return res.status(401).json({ message: 'Must be logged in'})
    }
}