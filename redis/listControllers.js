const jwt = require('jsonwebtoken')
const { createHash } = require('crypto')
const { promisify } = require('util')
function generateTokenHash(token) {
  return createHash('sha256').update(token).digest('hex')
}

module.exports = (list) => {
  const existsAsync = promisify(list.exists).bind(list)
  const setAsync = promisify(list.set).bind(list)
  const getAsync = promisify(list.get).bind(list)
  const delAsync = promisify(list.del).bind(list)

  return {
    async add(key, value, dateExpiration) {
      await setAsync(key, value)
      list.expireat(key, dateExpiration)
    },
    async searchValue(key) {
      return getAsync(key)
    },
    async hasKey(key) {
      const result = await existsAsync(key)
      return result === 1
    },
    async delete(key) {
      await delAsync(key)
    },

    // add: async (token) => {
    //   const dateExpiration = jwt.decode(token).exp
    //   const tokenHash = generateTokenHash(token)
    //   await setAsync(tokenHash, '')
    //   blocklist .expireat(tokenHash, dateExpiration)
    // },
    // hasToken: async (token) => {
    //   const tokenHash = generateTokenHash(token)
    //   const result = await existsAsync(tokenHash)
    //   return result === 1
    // },
  }
}
