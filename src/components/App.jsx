import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import fetch from 'node-fetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
      sessionActive: false
    }
  }
  
  componentDidMount() {
    this.checkSession().then(res => {
      console.log(res);
      this.setState({sessionActive: res});
    });
  }

  getCookie = (name) => {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  checkSession = async () => {
    let sessionId = this.getCookie('sessionId');
    let sessionResponse = await(await fetch(`/check-session`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({"sessionId": sessionId})
      }
    )).json();

    console.log(sessionResponse);
    return sessionResponse.active;
  }

  render() {

    return (
      <div>
        {!this.state.sessionActive ?
          <a href="/login"><h1>Login</h1></a>
        :
          <div>
            <a href="/logout"><h1>Logout</h1></a>
            <br/>
            <button onClick={this.checkSession}>Check Session</button>
          </div>
        }
      </div>
    );
  }
}

export default App;