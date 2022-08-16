const blocklist = require('./blocklist')
const jwt = require('jsonwebtoken')
const { createHash } = require('crypto')

function generateTokenHash(token) {
  return createHash('sha256').update(token).digest('hex')
}

module.exports = {
  add: async (token) => {
    const dateExpiration = jwt.decode(token).exp
    const tokenHash = generateTokenHash(token)
    await blocklist.set(tokenHash, '')
    blocklist.expireAt(tokenHash, dateExpiration)
  },
  hasToken: async (token) => {
    const tokenHash = generateTokenHash(token)
    const result = await blocklist.exists(tokenHash)
    return result === 1
  },
}
