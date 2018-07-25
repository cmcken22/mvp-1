var config = require('./config');
var express = require('express');
var path = require('path');
var app = express();

const dashboardRouter = require("./routes/dashboard");
const publicRouter = require("./routes/public");
const usersRouter = require("./routes/users");


const session = require("express-session");
const auth = require("./auth");
const middleware = require("./middleware");

var router = express.Router();

app.use(session({
  secret: "secret_nmws,menxlqenx,mdqwldxqlenqlsklnd;qlkewn;qx",
  resave: true,
  saveUninitialized: false
}));

app.use(express.static(__dirname + './../')); //serves the index.html

app.use(auth.oidc.router);
// app.use(middleware.addUser);

// app.use("/", publicRouter);
// app.use("/dashboard", middleware.loginRequired, dashboardRouter);
// app.use("/users", usersRouter);

app.get('/user-info', (req, res) => {
  // console.log('/user-info');
  // console.log(req.session);
  // console.log(user);
  res.send({user: user});
});

let user = null;
app.get('/redirect', (req, res) => {
  console.log('/redirect');
  // console.log(res);
  // console.log(req);
  console.log(req.session);
  // user = req.session.passport.user;
  const pathToIndex = path.resolve(__dirname + './../index.html'); 
  res.sendFile(pathToIndex, (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
});

app.get('/test', (req, res) => {
  console.log('/test');
  console.log(res);
  let url = `${auth.oktaConfig.orgUrl}/oauth2/default/v1/authorize?client_id=${auth.oktaConfig.client_id}&response_type=code&scope=openid&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fusers%2Fcallback&state=27f21648-e08f-4e57-961c-1fd7dc46acc1`;
  console.log(url);
  res.redirect(url);
})

app.get('/users/callback', (req, res) => {
  console.log('/redirect');
  // console.log(res);
  // console.log(req);
  console.log(req.session);
  // user = req.session.passport.user;
  const pathToIndex = path.resolve(__dirname + './../index.html'); 
  res.sendFile(pathToIndex, (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

auth.oidc.on('ready', () => {
  app.listen(config.port, () => console.log(`listening on port ${config.port}`));
});