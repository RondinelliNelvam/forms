const redis = require('redis')
module.exports = redis.createClient({ prefix: 'blocklist:' })
//TODO Atualizar o redis para a versão mais atualizada
