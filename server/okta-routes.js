const express        = require("express");
const okta           = express.Router();
const fetch          = require('node-fetch')

const client_id      = "0oafsm2mlaNbnoSq40h7"
const client_secret  = "rHJyWHf7_0pM-qe_Hvw4RD1XhT2LlQtgyy33ElSa"
const apikey         = "00Aw3z05lA4zZfuKckAMdpZrQ5AJ0StqPXG5CN0tP0"
const baseUrl        = 'https://dev-957770.oktapreview.com'
const redirect_uri   = "http://localhost:8080/authorization-code/callback"

const oktaRoutes = function(passport, redisClient) {
  okta.get('/tokens', passport.authenticate('okta', {session: false}), async (req, res) => {
    redisClient.rename('user', req.cookies['connect.sid'])
    res.redirect('/');
  })

  okta.get('/sessions', async (req, res) => {
    try {
      let currentSessionId = (await redisClient.hgetallAsync(req.cookies['connect.sid'])).sessionId
      let session = await (await fetch(`${baseUrl}/api/v1/sessions/${currentSessionId}`, {
        headers: {
                   "Accept": "application/json",
                   "Content-Type": "application/json",
                   "Authorization": `SSWS ${apikey}` }
        })
      ).json()
      session.status == 'ACTIVE' ? res.send(JSON.stringify({status: "ACTIVE"})) : res.send(JSON.stringify({status: "INACTIVE"}))
    } catch(error) {
      res.send(JSON.stringify({status: "INACTIVE"}))
    }
  })

  okta.post('/sessions', async (req, res) => {
    redisClient.hmset(req.cookies['connect.sid'], 'sessionId', req.body.sessionId)
  })

  okta.delete('/sessions', async (req, res) => {
    let currentSessionId = (await redisClient.hgetallAsync(req.cookies['connect.sid'])).sessionId
    let session = await fetch(`${baseUrl}/api/v1/sessions/${currentSessionId}`, {
      method: 'DELETE',
      headers: {
                 "Accept": "application/json",
                 "Content-Type": "application/json",
                 "Authorization": `SSWS ${apikey}` }

      })
  })

  return okta
}

module.exports = oktaRoutes
