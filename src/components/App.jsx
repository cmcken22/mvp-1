import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import fetch from 'node-fetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null
    }
  }
  
  componentDidMount() {
    fetch('/tokens').then(res => res.json()).then(json => {
      console.log(json);
      this.setState({
        id_token: json.id_token,
        access_token: json.access_token
      });
    });
  }

  handleLogin = () => {
    console.log(this.inputRef.value);
    fetch("/login",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ username: this.inputRef.value })
      })
  }

  render() {

    return (
      <div>
        {!this.state.access_token ?
          <div>
            <a onClick={this.handleLogin}><h1>Login</h1></a>
            <input type="text" ref={r => this.inputRef = r}/>
          </div>
        : null}
        <br/>
        {this.state.access_token ? 
          <div>
            <p style={{margin: '0px 0px 5px 0px'}}>access_token: &#123;</p>
            <p style={{
              margin: '0px 15px 0px 15px',
              overflow: 'hidden',
              wordBreak: 'break-all'
            }}>
              {this.state.access_token}
            </p>
            <p style={{margin: '5px 0px 0px 0px'}}>&#x7D;</p>
          </div>
        : null}
      </div>
    );
  }
}

export default App;