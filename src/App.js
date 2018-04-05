import React, { Component } from 'react';
import './App.css';
import AppRouter from './routers/AppRouter';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { startAddWriting } from './actions/writings';
import { firebase } from './firebase/firebase';

const store = configureStore();
store.dispatch(startAddWriting({text: "hello", createdAt: "no"}))

console.log(store.getState());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;
