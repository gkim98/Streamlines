import React, { Component } from 'react';
import './App.css';
import AppRouter from './routers/AppRouter';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { startAddWriting } from './actions/writings';
import { firebase } from './firebase/firebase';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

//firebase.database().ref('writings').remove();

// test if auth is working
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('log in');
  } else {
    console.log('log out');
  }
});

export default App;
