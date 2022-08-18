const jwt = require('jsonwebtoken')
const blocklist = require('../../redis/blocklist')
const bcrypt = require('bcrypt')
const allowlist = require('../../redis/allowlist')
const { senhaSecreta } = require('.')
const { InvalidArgumentError } = require('./erros')

// await bcrypt.compare(password, login.passwordHash)
async function verifyPassword(password, passwordHash) {
  const validate = await bcrypt.compare(password, passwordHash)
  if (!validate) {
    throw new InvalidArgumentError('E-mail ou senha inválidos')
  }
}
async function validateToken(req, res, next) {
  try {
    const payload = jwt.verify(req.headers.token, senhaSecreta)
    await verifyAccessToken(req.headers.token)
    next()
  } catch (error) {
    if (error.message == 'invalid signature') {
      return res
        .status(401)
        .json({ mensagem: 'Token Invalido, favor realizar login!' })
    } else if (error.message == 'jwt expired') {
      return res
        .status(401)
        .json({ mensagem: 'Token Expirado!', expiradoEm: error.expiredAt })
    }
    {
      return res.status(500).json(error.message)
    }
  }
}
async function verifyAccessToken(token) {
  const tokenOnBlocklist = await blocklist.hasToken(token)
  if (tokenOnBlocklist)
    throw new jwt.JsonWebTokenError('Token Inválido por logout!')
}

async function verifyRefreshToken(refreshToken) {
  if (!refreshToken) {
    throw new InvalidArgumentError('Refresh Token não enviado!')
  }
  const id = await allowlist.searchValue(refreshToken)
  if (!id) {
    throw new InvalidArgumentError('Refresh Token invalido')
  }
  return id
}
async function invalidateRefreshToken(refreshToken) {
  await allowlist.delete(refreshToken)
}

module.exports = {
  validateToken,
  verifyAccessToken,
  verifyRefreshToken,
  invalidateRefreshToken,
  verifyPassword,
}
