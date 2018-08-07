const express        = require("express");
const okta           = express.Router();
const fetch          = require('node-fetch')

const client_id      = "0oafsm2mlaNbnoSq40h7"
const client_secret  = "rHJyWHf7_0pM-qe_Hvw4RD1XhT2LlQtgyy33ElSa"
const apikey         = "00Aw3z05lA4zZfuKckAMdpZrQ5AJ0StqPXG5CN0tP0"
const baseUrl        = 'https://dev-957770.oktapreview.com'
const redirect_uri   = "http://localhost:8080/authorization-code/callback"

const oktaRoutes = function(passport) {

  okta.get('/tokens', passport.authenticate('okta'), async (req, res) => {

    res.redirect('/');
  })

  okta.get('/check', (req, res) => {
    console.log(req.user)
  })

  return okta
}

module.exports = oktaRoutes
