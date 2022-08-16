const jwt = require('jsonwebtoken')
const blocklist = require('../../redis/blocklistController')

const crypto = require('crypto')
const moment = require('moment')
const allowlist = require('../../redis/allowlist')
async function verifyPassword(req, res, next) {
  try {
    const payload = jwt.verify(req.headers.token, 'senha-secreta')
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
async function createOpaqueToken(user) {
  const tokenOpaque = crypto.randomBytes(24).toString('hex')
  const dateExpiration = moment().add(5, 'd').unix()
  await allowlist.add(tokenOpaque, user.id, dateExpiration)
  return tokenOpaque
}

module.exports = { verifyPassword, verifyTokenBlocklist, createOpaqueToken }
