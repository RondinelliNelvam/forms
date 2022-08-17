const jwt = require('jsonwebtoken')
const { senhaSecreta } = require('.')
const { createHash } = require('crypto')
const allowlist = require('../../redis/allowlist')
const crypto = require('crypto')
const moment = require('moment')

function generateTokenHash(token) {
  return createHash('sha256').update(token).digest('hex')
}
async function generatePassHash(password) {
  const priceHash = 12
  return bcrypt.hash(password, priceHash)
}
async function createOpaqueToken(user) {
  //TODO Atualizar o Crypto para UUID v4
  const tokenOpaque = crypto.randomBytes(24).toString('hex')
  const dateExpiration = moment().add(5, 'd').unix()
  await allowlist.add(tokenOpaque, user.id, dateExpiration)
  return tokenOpaque
}
async function regenTokens(user) {
  const refreshToken = await createOpaqueToken(user)
  const acessToken = jwt.sign(
    { id: user.id, email: user.email },
    senhaSecreta,
    { expiresIn: '15m' }
  )
  return [refreshToken, acessToken]
}

module.exports = {
  generatePassHash,
  regenTokens,
  generateTokenHash,
}
