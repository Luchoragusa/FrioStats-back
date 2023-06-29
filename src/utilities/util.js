const jwt = require('jwt-simple')
const moment = require('moment')

const getId = (req) => {
  const userToken = req.headers['user-token']
  const payload = jwt.decode(userToken, process.env.SECRET_KEY)
  console.log(payload.userId)
  return payload.userId
}

const createToken = (u) => {
  const payload = {
    userId: u.id,
    email: u.email,
    idRol: u.idRol,
    createdAt: moment().unix(),
    expiredAt: moment().add(1, 'hour').unix()
  }
  return jwt.encode(payload, process.env.SECRET_KEY)
}

module.exports = {
  getId,
  createToken
}
