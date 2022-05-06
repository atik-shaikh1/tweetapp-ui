import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import './bootstrap.css';
import TweetApp from './components/TweetApp';

class App extends Component {
  render() {
    return (
      <div className="App">
         <TweetApp></TweetApp>
      </div>
    );
  }
}


export default App;
