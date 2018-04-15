import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history';

import './css/main.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { firebase } from './firebase/firebase';
import { history } from './routers/AppRouter';
import { logout, login } from './actions/auth';
import configureStore from './store/configureStore';

// configures the redux store
const store = configureStore();

let hasRendered = false;
// ensures that app is only rendered once
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(<App store={store}/>, document.getElementById('root'));
        hasRendered = true;
    } 
};

// event listener for loggin in/out
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('logged in');
        // adds user id to redux store
        store.dispatch(login(user.uid));
        renderApp();
    } else {
        console.log('logged out');
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});

registerServiceWorker();
