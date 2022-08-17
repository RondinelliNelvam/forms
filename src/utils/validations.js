const jwt = require('jsonwebtoken')
const blocklist = require('../../redis/blocklist')

const allowlist = require('../../redis/allowlist')
const { senhaSecreta } = require('.')

// await bcrypt.compare(password, login.passwordHash)

async function validateToken(req, res, next) {
  try {
    const payload = jwt.verify(req.headers.token, senhaSecreta)
    await verifyTokenBlocklist(req.headers.token)
    next()
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
async function verifyTokenBlocklist(token) {
  const tokenOnBlocklist = await blocklist.hasToken(token)
  if (tokenOnBlocklist)
    throw new jwt.JsonWebTokenError('Token Inválido por logout!')
}

async function verifyRefreshToken(refreshToken) {
  try {
    const id = await allowlist.searchValue(refreshToken)
    return id
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
async function invalidateRefreshToken(refreshToken) {
  await allowlist.delete(refreshToken)
}

module.exports = {
  validateToken,
  verifyTokenBlocklist,
  verifyRefreshToken,
  invalidateRefreshToken,
}
