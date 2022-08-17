const jwt = require('jsonwebtoken')
const blocklist = require('../../redis/blocklist')

const crypto = require('crypto')
const moment = require('moment')
const allowlist = require('../../redis/allowlist')

async function validateToken(req, res, next) {
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
  createOpaqueToken,
  verifyRefreshToken,
  invalidateRefreshToken,
}
