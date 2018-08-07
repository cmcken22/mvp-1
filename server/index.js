const config          = require('./config/index.js');
const express         = require("express");
const app             = express();
const bodyParser      = require("body-parser");
const path            = require('path');
const session         = require('express-session');
const fetch           = require('node-fetch');
const oktaRoutes      = require('./okta-routes.js');
const passport        = require('passport');
const OktaStrategy    = require('passport-okta-oauth').Strategy;

// let sandbox = !true;
// const okta = sandbox ? auth.ellisDon_oktaConfig : auth.oktaConfig;
const client_id      = "0oafsm2mlaNbnoSq40h7"
const client_secret  = "rHJyWHf7_0pM-qe_Hvw4RD1XhT2LlQtgyy33ElSa"
const apikey         = "00Aw3z05lA4zZfuKckAMdpZrQ5AJ0StqPXG5CN0tP0"
const baseUrl        = 'https://dev-957770.oktapreview.com'
const redirect_uri   = "http://localhost:8080/authorization-code/callback"

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false}
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use('okta', new OktaStrategy({
  audience: 'https://dev-957770.oktapreview.com',
  clientID: `${client_id}`,
  clientSecret: `${client_secret}`,
  callbackURL: 'http://localhost:8080/tokens',
  scope: 'openid offline_access profile',
  response_type: 'code'
}, (accessToken, refreshToken, profile, done) => {
  done(null, {accessToken, refreshToken, profile})
}));

passport.serializeUser((user, next) => {
  next(null, user);
});
passport.deserializeUser((obj, next) => {
  next(null, obj);
});

app.use(express.static(__dirname + './../'));
app.use('/login', passport.authenticate('okta'))
app.use('/', oktaRoutes(passport))

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
