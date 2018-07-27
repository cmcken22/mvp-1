var config = require('./config');
var express = require('express');
var path = require('path');
var app = express();
var fetch = require("node-fetch");
const session = require("express-session");
const auth = require("./auth");

var router = express.Router();

app.use(session({
  secret: "secret_nmws,menxlqenx,mdqwldxqlenqlsklnd;qlkewn;qx",
  resave: true,
  saveUninitialized: false
}));

app.use(express.static(__dirname + './../')); //serves the index.html

app.get('/login', (req, res) => {
  console.log('/login', req.sessionID);
  res.redirect(`${auth.orgUrl}/oauth2/default/v1/authorize?client_id=${auth.client_id}&response_type=code&redirect_uri=${auth.redirect_uri}&scope=${auth.scope}&state=state-${req.sessionID}`)
 })
 
 app.get('/authorization-code/callback', async (req, res) => {
 
  let response = await(
    await fetch(`${auth.orgUrl}/oauth2/default/v1/token?code=${req.query.code}&state=${req.query.state}&client_id=${auth.client_id}&client_secret=${auth.client_secret}&grant_type=authorization_code&redirect_uri=${auth.redirect_uri}`,
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
  session.id_token = response.id_token;
  
  let pathToIndex = path.resolve(__dirname, './../index.html');
  res.sendFile(pathToIndex);
 });

 app.get('/tokens', (req, res) => {
   console.log('/tokens');
   console.log(session.access_token);

   res.send({
     id_token: session.id_token,
     access_token: session.access_token
   });
 });

 app.listen(config.port, () => console.log(`Listening on port ${config.port}`));