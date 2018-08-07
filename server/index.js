const config          = require('./config/index.js')
const express         = require("express");
const app             = express();
const bodyParser      = require("body-parser");
const path            = require('path')
const session         = require('express-session');
const cookieParser    = require('cookie-parser')
const fetch           = require('node-fetch')
const oktaRoutes      = require('./okta-routes.js')()

// let sandbox = !true;
// const okta = sandbox ? auth.ellisDon_oktaConfig : auth.oktaConfig;

app.use(express.static('public'));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false}
}))

app.use(express.static(__dirname + './../'));

app.use('/', oktaRoutes)

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
