const redis = require('redis')
const blocklist = redis.createClient({ prefix: 'blocklist:' })
const listController = require('./listControllers')
const blockListController = listController(blocklist)

const jwt = require('jsonwebtoken')
const { generateTokenHash } = require('../src/utils/tokens')

module.exports = {
  add: async (token) => {
    const dateExpiration = jwt.decode(token).exp
    const tokenHash = generateTokenHash(token)
    await blockListController.add(tokenHash, '', dateExpiration)
  },
  hasToken: async (token) => {
    const tokenHash = generateTokenHash(token)
    return blockListController.hasKey(tokenHash)
  },
}
