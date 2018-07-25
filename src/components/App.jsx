import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import fetch from 'node-fetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }
  
  componentDidMount() {
    console.log('componentDidMount');
    fetch('/user-info')
      .then(res => res.json())
      .then(json => {
        console.log(json.user.name);
        this.setState({user: json.user.name});
      });
  }

  handleClick = () => {
    console.log('handleClick');
    // fetch('/user-info');
    fetch('/users/login');
  }

  render() {

    return (
      <div>
        {!this.state.user ? 
          <a href="/users/login"><h1>Login</h1></a>
        :
          <h1>Hello, {this.state.user}</h1>
        }
        <br/>
        <button onClick={this.handleClick}>test</button>
      </div>
    );
  }
}

export default App;