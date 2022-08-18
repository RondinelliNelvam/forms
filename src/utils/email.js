'use strict'
const nodemailer = require('nodemailer')
const { email } = require('.')
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

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(emailAuth, demandId) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(emailConfig)
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from:
      process.env.NODE_ENV == 'dev'
        ? '"Fred Foo 👻" <foo@example.com>'
        : process.env.EMAILUSER, // sender address
    to:
      process.env.NODE_ENV == 'dev'
        ? `teste@example, ${emailAuth}`
        : `email1,email2,email3`, // list of receivers
    subject: 'Criação da Demanda', // Subject line
    text: `Olá, a demanda de número nº${demandId} foi criada!`, // plain text body
    html: `<b>Olá, a demanda de número nº${demandId} foi criada!</b>`, // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendEmail().catch(console.error)

module.exports = sendEmail
