const express        = require("express");
const okta           = express.Router();
const fetch          = require('node-fetch')

const client_id      = "0oafsm2mlaNbnoSq40h7"
const client_secret  = "rHJyWHf7_0pM-qe_Hvw4RD1XhT2LlQtgyy33ElSa"
const apikey         = "00Aw3z05lA4zZfuKckAMdpZrQ5AJ0StqPXG5CN0tP0"
const baseUrl        = 'https://dev-957770.oktapreview.com'
const redirect_uri   = "http://localhost:8080/authorization-code/callback"

const oktaRoutes = function() {

  okta.get('/authorization-code/callback', async (req, res) => {
    let tokens = await ( await fetch(`${baseUrl}/oauth2/default/v1/token?code=${req.query.code}&client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&redirect_uri=${redirect_uri}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': "application/json",
        }
      }
    )).json()
    req.session.tokens = tokens
    res.redirect('/');
  })

  okta.get('/check', (req, res) => {
    console.log(req.session)
  })

  return okta
}

module.exports = oktaRoutes
