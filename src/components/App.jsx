import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import fetch from 'node-fetch';

const client_id      = "0oafsm2mlaNbnoSq40h7"
const client_secret  = "rHJyWHf7_0pM-qe_Hvw4RD1XhT2LlQtgyy33ElSa"
const apikey         = "00Aw3z05lA4zZfuKckAMdpZrQ5AJ0StqPXG5CN0tP0"
const baseUrl        = 'https://dev-957770.oktapreview.com'
const redirect_uri   = "http://localhost:8080/authorization-code/callback"

const OktaAuth = require('@okta/okta-auth-js');
const config = {
  url: `${baseUrl}`,
  clientId: `${client_id}`,
  redirectUri: `${redirect_uri}`,
}
const authClient = new OktaAuth(config)

class App extends Component {
  constructor(props) {
    super(props);
  }

  login = () => {
    authClient.signIn({
      username: 'conner.mckenna94@gmail.com',
      password: 'Ellisdon2017'
    })
    .then( (transaction) => {
      if (transaction.status == 'SUCCESS') {
        authClient.session.setCookieAndRedirect(transaction.sessionToken, `${baseUrl}/oauth2/default/v1/authorize?client_id=${client_id}&state=state-1234-1234-1243&response_type=code&scope=openid&redirect_uri=${redirect_uri}`);
      } else {
        console.log('login failed')
      }
    })
  }

  logout = () => {
    authClient.signOut()
    .then(function() {
      console.log('successfully logged out');
    })
    .fail(function(err) {
      console.error(err);
    });

  }

  checkForOktaSession = () => {
    authClient.session.get()
    .then( async (session) => {
      console.log(session)
    })
    .catch( (err) => {
      console.log(err)
    });
  }

  checkExpressSession = () => {
    // this will log the current express session to the terminal
    fetch('/check', {credentials: 'same-origin'})
  }

  render() {
    return (
      <div>
        <div>

          <button onClick={this.login}>LOGIN</button>
        </div>
        <button onClick={this.checkForOktaSession}>CHECK SESSION</button>
        <button onClick={this.checkExpressSession}>CHECK EXPRESS SESSION</button>
        <button onClick={this.logout}>LOGOUT</button>
      </div>
    )
  }
}

export default App;
