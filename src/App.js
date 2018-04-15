import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import AppRouter from './routers/AppRouter';

import { startAddWriting } from './actions/writings';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;
