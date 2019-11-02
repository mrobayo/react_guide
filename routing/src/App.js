import React, { Component } from 'react';
import  { BrowserRouter } from 'react-router-dom';

import Main from './containers/Main/Main';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
      <div className="App">
        <Main />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
