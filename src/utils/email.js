'use strict'
const nodemailer = require('nodemailer')
const { email } = require('.')
const { verifyRefreshToken } = require('./validations')
const { AuthorizedPersonsServices, UserLoginServices } = require('../services')
const authorizedPersonsService = new AuthorizedPersonsServices()
const userLoginService = new UserLoginServices()

require('dotenv').config()
const emailConfig = {
  host: process.env.NODE_ENV == 'dev' ? email.emailHost : process.env.EMAILHOST,
  port: process.env.NODE_ENV == 'dev' ? email.emailPort : process.env.EMAILPORT,
  auth: {
    user:
      process.env.NODE_ENV == 'dev' ? email.emailUser : process.env.EMAILUSER,
    pass:
      process.env.NODE_ENV == 'dev'
        ? email.emailPassword
        : process.env.EMAILPASSWORD,
  },
}

async function sendEmail(emailUser, emailAuth, demandId) {
  let transporter = nodemailer.createTransport(emailConfig)
  let info = await transporter.sendMail({
    from:
      process.env.NODE_ENV == 'dev'
        ? '"Fred Foo 👻" <foo@example.com>'
        : process.env.EMAILUSER,
    to:
      process.env.NODE_ENV == 'dev'
        ? `teste@example,${emailUser}, ${emailAuth}`
        : `email1,email2,email3`,
    subject: 'Criação da Demanda',
    text: `Olá, a demanda de número nº${demandId} foi criada!`,
    html: `<b>Olá, a demanda de número nº${demandId} foi criada!</b>`,
  })

  console.log('Message sent: %s', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}

async function searchEmails(refreshToken, authorizedPersonId) {
  const id = await verifyRefreshToken(refreshToken)
  const emailUser = await userLoginService.findOneRegistry(id)
  const authPerson = await authorizedPersonsService.findOneRegistry(
    authorizedPersonId
  )
  return [emailUser.email, authPerson.email]
}

module.exports = { sendEmail, searchEmails }
