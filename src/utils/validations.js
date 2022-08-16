const jwt = require('jsonwebtoken')

async function verifyPassword(req, res, next) {
  try {
    const payload = jwt.verify(req.headers.token, 'senha-secreta')
    next()
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

module.exports = verifyPassword
