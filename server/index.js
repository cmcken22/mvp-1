var config = require('./config');
var express = require('express');
var path = require('path');
var app = express();
var fetch = require("node-fetch");
const session = require("express-session");
const auth = require("./auth");

let sandbox = !true;
const okta = sandbox ? auth.ellisDon_oktaConfig : auth.oktaConfig;

var router = express.Router();

app.use(session({
  secret: "secret_nmws,menxlqenx,mdqwldxqlenqlsklnd;qlkewn;qx",
  resave: true,
  saveUninitialized: false
}));

app.use(express.static(__dirname + './../')); //serves the index.html

// app.get('/login', (req, res) => {
//   console.log('/login', req.sessionID);
//   res.redirect(`${okta.baseUrl}/oauth2/default/v1/authorize?client_id=${okta.client_id}&response_type=code&redirect_uri=${okta.redirect_uri}&scope=${okta.scope}&state=state-${req.sessionID}`)
//  });

const body = {
  username: "conner.mckenna94@gmail.com",
  password: "Ellisdon2017"
}

let sessionID = null;

app.get('/login', async (req, res) => {

  let loginResponse = await (await fetch(`${okta.baseUrl}/api/v1/authn`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body)
    }
  )).json(); 
  // console.log(loginResponse.sessionToken);

  let sessionResponse = await (await fetch(`${okta.baseUrl}/api/v1/sessions`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        "sessionToken": `${loginResponse.sessionToken}`
      })
    }
  )).json();
  // console.log(sessionResponse);
  sessionID = sessionResponse.id;

  // res.redirect(`https://dev-957770.oktapreview.com/oauth2/default/v1/authorize?client_id=${client_id}&response_type=code&scope=openid&state=state-1234&redirect_uri=http://localhost:8080/authorization-code/callback`)
  res.redirect('/');
});

app.get('/check-session', async (req, res) => {
  // let sessionResponse = await (await fetch(`${okta.baseUrl}/api/v1/sessions/${sessionID}`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json",
  //       "Authorization": `SSWS 00Ba8tLkQ4XeFgtFoeD4-Cr5GrZZSeZ4g6qNxCrYD8`
  //     }
  //   }
  // )).json();
  // console.log(sessionResponse);
});


 app.get('/authorization-code/callback', async (req, res) => {
 
  let response = await(
    await fetch(`${okta.baseUrl}/oauth2/default/v1/token?code=${req.query.code}&state=${req.query.state}&client_id=${okta.client_id}&client_secret=${okta.client_secret}&grant_type=authorization_code&redirect_uri=${okta.redirect_uri}`,
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