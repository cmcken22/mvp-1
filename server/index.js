var config = require('./config');
var express = require('express');
var path = require('path');
var app = express();
var fetch = require("node-fetch");
const session = require("express-session");
const auth = require("./auth");

let sandbox = true;
const okta = sandbox ? auth.ellisDon_oktaConfig : auth.oktaConfig;

var router = express.Router();

app.use(session({
  secret: "secret_nmws,menxlqenx,mdqwldxqlenqlsklnd;qlkewn;qx",
  resave: true,
  saveUninitialized: false
}));

app.use(express.static(__dirname + './../')); //serves the index.html

app.get('/login', (req, res) => {
  console.log('/login', req.sessionID);
  res.redirect(`${okta.orgUrl}/oauth2/default/v1/authorize?client_id=${okta.client_id}&response_type=code&redirect_uri=${okta.redirect_uri}&scope=${okta.scope}&state=state-${req.sessionID}`)
 });
 
 app.get('/authorization-code/callback', async (req, res) => {
 
  let response = await(
    await fetch(`${okta.orgUrl}/oauth2/default/v1/token?code=${req.query.code}&state=${req.query.state}&client_id=${okta.client_id}&client_secret=${okta.client_secret}&grant_type=authorization_code&redirect_uri=${okta.redirect_uri}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': "application/json",
        },
      }
    )
  ).json();

  session.access_token = response.access_token;
  let pathToIndex = path.resolve(__dirname, './../index.html');
  res.sendFile(pathToIndex);
 });

 app.get('/tokens', (req, res) => {
   console.log('/tokens');
   console.log(session.access_token);
   res.send({
     access_token: session.access_token
   });
 });

 app.listen(config.port, () => console.log(`Listening on port ${config.port}`));