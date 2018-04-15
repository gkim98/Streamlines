import { firebase, googleAuthProvider } from '../firebase/firebase';

// remember that these actions are possible due to thunk
export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogin = (dispatch) => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const logout = (uid) => ({
    type: 'LOGOUT'
});

export const startLogout = (dispatch) => {
    return () => {
        return firebase.auth().signOut();
    };
};