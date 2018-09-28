const config          = require('./config/index.js');
const express         = require("express");
const app             = express();
const bodyParser      = require("body-parser");
const path            = require('path');
const session         = require('express-session');
const cookieParser    = require('cookie-parser')
const fetch           = require('node-fetch');
const oktaRoutes      = require('./okta-routes.js');
const passport        = require('passport');
const OktaStrategy    = require('passport-okta-oauth').Strategy;

const redis           = require('redis')
const redisClient     = redis.createClient();
const bluebird         = require('bluebird')
bluebird.promisifyAll(redis.RedisClient.prototype);

const client_id      = "0oafsm2mlaNbnoSq40h7"
const client_secret  = "rHJyWHf7_0pM-qe_Hvw4RD1XhT2LlQtgyy33ElSa"
const apikey         = "00Aw3z05lA4zZfuKckAMdpZrQ5AJ0StqPXG5CN0tP0"
const baseUrl        = 'https://dev-957770.oktapreview.com'
const redirect_uri   = "http://localhost:8080/authorization-code/callback"

app.use(express.static('public'));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false, maxAge: 60*10000}
}))
app.use(passport.initialize());
passport.use('okta', new OktaStrategy({
  audience: 'https://dev-957770.oktapreview.com',
  clientID: `${client_id}`,
  clientSecret: `${client_secret}`,
  callbackURL: 'http://localhost:8080/tokens',
  scope: ['openid', 'offline_access', 'profile'],
}, async (accessToken, refreshToken, profile, done) => {
     redisClient.hmset('user', ['profile', JSON.stringify(profile), 'accessToken', accessToken, 'refreshToken', refreshToken])
     done(null, {})
}));

app.use(express.static(__dirname + './../'));
app.use('/login', passport.authenticate('okta'));
app.use('/', oktaRoutes(passport, redisClient));

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`)} );
redisClient.on('connect', () => {
  console.log('Redis client connected')
})
redisClient.on('error', (err) => {
    console.log('Something went wrong ' + err);
});
