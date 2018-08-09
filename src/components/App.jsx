import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Component }               from 'react';
import fetch                              from 'node-fetch';

const client_id    = '0oafsm2mlaNbnoSq40h7'
const baseUrl      = 'https://dev-957770.oktapreview.com'
const redirect_uri = 'http://localhost:8080/authorization-code/callback'
const OktaAuth     = require('@okta/okta-auth-js');
const axios        = require('axios')

const config = {
  url: `${baseUrl}`,
  clientId: `${client_id}`,
  redirectUri: `${redirect_uri}`,
}
const authClient = new OktaAuth(config)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount = async () => {
    let currentSession = await authClient.session.get()
    if (currentSession.status == 'ACTIVE') {
      axios.post('/sessions', {sessionId: currentSession.id})
      this.setState({currentSession: 'ACTIVE'})
    } else if (currentSession.status == 'INACTIVE') {
      let storedSession = await axios.get('/sessions')
      this.setState({currentSession: storedSession.data.status})
    }

  }

  login = () => {
    authClient.signIn({
      username: 'conner.mckenna94@gmail.com',
      password: 'Ellisdon2017'
    })
    .then( (transaction) => {
      if (transaction.status == 'SUCCESS')
        authClient.session.setCookieAndRedirect(transaction.sessionToken, 'http://localhost:8080/login');
      else
        console.log('login failed')
    })
    .fail( (err) => {
      console.error("error:", err)
    })
  }

  logout = () => {
    axios.delete('/sessions')
    window.location.reload()
  }

  checkForOktaSession = async () => {
    let storedSession = await axios.get('/sessions')
    console.log(storedSession.data)
    return storedSession.data
  }

  render() {
    return (
      <div>
        <button onClick={this.login}>LOGIN</button>
        <button onClick={this.checkForOktaSession}>CHECK SESSION</button>
        <button onClick={this.logout}>LOGOUT</button>
      </div>
    )
  }
}

export default App;
