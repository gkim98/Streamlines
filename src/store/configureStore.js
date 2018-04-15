import { createStore, combineReducers, applyMiddleware } from 'redux';
import writingsReducer from '../reducers/writings';
import authReducer from '../reducers/auth';
import thunk from 'redux-thunk';

export default () => {
    const store = createStore(
        // using combineReducers in anticipation for more red
        combineReducers({
            writings: writingsReducer,
            auth: authReducer
        }),
        // allows dispatch of actions that return functions
        applyMiddleware(thunk)
    );

    return store;
};