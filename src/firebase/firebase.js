import * as firebase from 'firebase';
import { config } from './firebaseConfig';

firebase.initializeApp(config);

const database = firebase.database();
// need to set up a provider for authentification
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export { firebase, googleAuthProvider, database as default};