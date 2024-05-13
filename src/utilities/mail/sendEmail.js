const path = require('path')
const jwt = require('jwt-simple')
const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const Util = require('../util')
const fecha = require('fecha')

const OAuth2 = google.auth.OAuth2

const accountTransport = {
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USERNAME,
    clientId: process.env.EMAIL_CLIENT_ID,
    clientSecret: process.env.EMAIL_CLIENT_SECRET,
    refreshToken: process.env.EMAIL_REFRESH_TOKEN
  }
}

// eslint-disable-next-line camelcase
const mail_rover = async (callback) => {
  const oauth2Client = new OAuth2(
    accountTransport.auth.clientId,
    accountTransport.auth.clientSecret,
    'https://developers.google.com/oauthplayground'
  )
  oauth2Client.setCredentials({
    refresh_token: accountTransport.auth.refreshToken,
    tls: {
      rejectUnauthorized: false
    }
  })
  oauth2Client.getAccessToken((err, token) => {
    if (err) return console.log(err)
    accountTransport.auth.accessToken = token
    callback(nodemailer.createTransport(accountTransport))
  })
}

const handlebarOptions = {
  viewEngine: {
    extName: '.handlebars',
    partialsDir: path.resolve('.src/utilities/mail/views'),
    defaultLayout: false
  },
  viewPath: path.resolve('src/utilities/mail/views'),
  extname: '.handlebars'
}

const sendConfirmationEmail = async (user) => {
  const token = jwt.encode(user.email, process.env.SECRET_KEY)
  const url = `http://186.13.28.124:5000/confirmEmail/${token}`

  const mailOptions = {
    from: {
      name: 'Frio Stats',
      address: process.env.EMAIL
    },
    to: user.email,
    subject: 'Confirmación de cuenta',
    template: 'confirmationEmail',
    context: { // Estos datos se pasan al template, se accede con {{}}, son las variables
      url,
      user: user.nombre,
      logo: 'http://186.13.28.124/FrioStats/images/logo.png'
    }
  }
  sendEmail(mailOptions)
}

const sendNotificationEmail = async (user) => {
  const token = jwt.encode(user.email, process.env.SECRET_KEY)
  const url = `http://186.13.28.124:5000/index`
  const fechaFormateada = fecha.format(new Date(), 'HH:mm - DD/MM/YYYY')

  const mailOptions = {
    from: {
      name: 'Frio Stats',
      address: process.env.EMAIL
    },
    to: user.email,
    subject: 'Alerta de maquinaria',
    template: 'notificationEmail',
    context: { // Estos datos se pasan al template, se accede con {{}}, son las variables
      url,
      fechaFormateada,
      user: user.nombre,
      logo: 'http://186.13.28.124/FrioStats/images/logo.png'
    }
  }
  sendEmail(mailOptions)
}

const sendEmail = async (mailOptions) => {
  try {
    mail_rover((transporter) => {
      transporter.use('compile', hbs(handlebarOptions))
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          Util.sendErrorMessage(err)
        } else {
          Util.sendInfoMessage(`Email enviado al correo ${info.accepted}`)
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  sendConfirmationEmail,
  sendNotificationEmail
}
