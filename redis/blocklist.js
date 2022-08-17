const redis = require('redis')

const blocklist = redis.createClient({ prefix: 'blocklist:' })
const listController = require('./listControllers')
const blockListController = listController(blocklist)
const { promisify } = require('util')
const existsAsync = promisify(blocklist.exists).bind(blocklist)
const setAsync = promisify(blocklist.set).bind(blocklist)

const jwt = require('jsonwebtoken')
const { createHash } = require('crypto')

function geraTokenHash(token) {
  return createHash('sha256').update(token).digest('hex')
}

module.exports = {
  add: async (token) => {
    const dateExpiration = jwt.decode(token).exp
    const tokenHash = geraTokenHash(token)
    await blockListController.add(tokenHash, '', dateExpiration)
  },
  hasToken: async (token) => {
    const tokenHash = geraTokenHash(token)
    return blockListController.hasKey(tokenHash)
  },
}
