import * as firebase from 'firebase';
import { config } from './firebaseConfig';

firebase.initializeApp(config);

const database = firebase.database();
export { firebase, database as default};