const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const moment = require('moment')

async function generatePassHash(password) {
  const priceHash = 12
  return bcrypt.hash(password, priceHash)
}

module.exports = { generatePassHash }
