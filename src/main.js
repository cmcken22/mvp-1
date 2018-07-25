import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

require('./scss/main.scss');

document.addEventListener('DOMContentLoaded', function() {
  render(
    <App />,
    document.getElementById('root')
  )
})