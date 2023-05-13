/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Validacion del token

const Strategy = new JwtEstrategy(opts, async (payload, done) => {
  try {
    await Usuario.findOne({ where: { id: payload.id } })
      .then((user) => {
        if (user) {
          // Valido el tiempo de expiración del token
          if (payload.exp <= Date.now()) {
            return done(null, false)
          } else {
            return done(null, user)// si existe el usuario
          }
        } else {
          return done(null, false) // si no existe el usuario
        }
      })
  } catch (error) {
    return done(error, false)
  }
})

// Creacion del token

function issueJWT (user) {
  const _id = user.id

  const expiresIn = '1d'

  const payload = {
    id: _id,
    iat: Date.now(),
    exp: Date.now() + expiresIn // Esta será la fecha de expiración del token
  }

  const signedToken = jsonwebtoken.sign(payload, process.env.SECRET_KEY, { expiresIn, algorithm: 'RS256' })

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn
  }
}
