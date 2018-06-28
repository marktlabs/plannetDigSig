import firebase from 'firebase';
import 'firebase/database';

import { DB_CONFIG } from "./config";


const firebaseApp = firebase.initializeApp(DB_CONFIG);

export default firebaseApp;

export const ScheduleDatabase = firebaseApp.database().ref().child('Scheduler');