require('dotenv').config()

module.exports = {
  senhaSecreta:
    process.env.NODE_ENV == 'dev' ? 'senha-secreta' : process.env.SENHASECRETA,
}
