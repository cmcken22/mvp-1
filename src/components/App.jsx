import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import fetch from 'node-fetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_token: null,
      access_token: null
    }
  }
  
  componentDidMount() {
    // console.log('componentDidMount');
    // fetch('/user-info')
    //   .then(res => res.json())
    //   .then(json => {
    //     console.log(json.user.name);
    //     this.setState({user: json.user.name});
    //   });
    console.log('handleClick');
    fetch('/tokens').then(res => res.json()).then(json => {
      console.log(json);
      this.setState({
        id_token: json.id_token,
        access_token: json.access_token
      });
    });
  }

  handleClick = () => {
    console.log('handleClick');
    fetch('/tokens').then(res => res.json()).then(json => {
      console.log(json);
      this.setState({
        id_token: json.id_token,
        access_token: json.access_token
      });
    });
  }

  render() {

    return (
      <div>
        {!(this.state.id_token && this.state.access_token) ?
          <a href="/login"><h1>Login</h1></a>
        : null}
        <br/>
        {this.state.id_token && this.state.access_token ? 
          <div>
            <p style={{margin: '0px'}}>id_token: &#123;</p>
            <p style={{
              margin: '0px 15px 0px 15px',
              overflow: 'hidden',
              wordBreak: 'break-all'
            }}>
              {this.state.id_token}
            </p>
            <p style={{margin: '0px'}}>&#x7D;</p>
            <br/>
            <p style={{margin: '0px'}}>access_token: &#123;</p>
            <p style={{
              margin: '0px 15px 0px 15px',
              overflow: 'hidden',
              wordBreak: 'break-all'
            }}>
              {this.state.access_token}
            </p>
            <p style={{margin: '0px'}}>&#x7D;</p>
          </div>
        : null}
      </div>
    );
  }
}

export default App;