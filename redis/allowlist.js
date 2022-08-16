const redis = require('redis')
const listControllers = require('./listControllers')
const allowList = redis.createClient({ prefix: 'allowList:' })

module.exports = listControllers(allowList)
