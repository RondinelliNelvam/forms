require('dotenv').config()

module.exports = {
  senhaSecreta:
    process.env.NODE_ENV == 'dev' ? 'senha-secreta' : process.env.SENHASECRETA,

  email: {
    emailHost: 'smtp.mailtrap.io',
    emailPort: 2525,
    emailUser: '43fb9d5e0fd795',
    emailPassword: '9bd09b2115d217',
  },
}
