import firebase from "firebase/compat/app";
import 'firebase/compat/functions';   
import 'firebase/compat/firestore';


const config = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGE_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID,
    measurementId: process.env.VUE_APP_MESUREMENT_ID
}

firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore()

export {
    db,
    firebase
}

