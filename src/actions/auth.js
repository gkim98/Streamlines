import { firebase, googleAuthProvider } from '../firebase/firebase';

/*
    initiates login

    where is the logged in state stored?
*/
export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};