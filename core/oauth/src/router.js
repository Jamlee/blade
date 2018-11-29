const passport = require('./passport')
const oauth2orize = require('oauth2orize')
const oauth2Server = oauth2orize.createServer()
const express = require('express')
const router = express.Router()

const ensureLoggedIn = passport.authenticate('local',
  { successReturnToOrRedirect: '/', failureRedirect: '/login' })

oauth2Server.grant(oauth2orize.grant.code(function (client, redirectURI, user, ares, done) {
  let code = utils.uid(16)
  let ac = new AuthorizationCode(code, client.id, redirectURI, user.id, ares.scope)
  ac.save(function (err) {
    if (err) { return done(err) }
    return done(null, code)
  })
}))

oauth2Server.exchange(oauth2orize.exchange.code(function (client, code, redirectURI, done) {
  AuthorizationCode.findOne(code, function (err, code) {
    if (err) { return done(err) }
    if (client.id !== code.clientId) { return done(null, false) }
    if (redirectURI !== code.redirectUri) { return done(null, false) }
    let token = utils.uid(256)
    let at = new AccessToken(token, code.userId, code.clientId, code.scope)
    at.save(function (err) {
      if (err) { return done(err) }
      return done(null, token)
    })
  })
}))

router.get('/dialog/authorize',
  ensureLoggedIn,
  oauth2Server.authorize(function (clientID, redirectURI, done) {
    Clients.findOne(clientID, function (err, client) {
      if (err) { return done(err) }
      if (!client) { return done(null, false) }
      if (client.redirectUri != redirectURI) { return done(null, false) }
      return done(null, client, client.redirectURI)
    })
  }),
  function (req, res) {
    res.render('dialog', {
      transactionID: req.oauth2.transactionID,
      user: req.user, client: req.oauth2.client
    })
  }
)

module.exports = router

