// import { initializeApp } from "firebase/app";

// importScripts('https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/9.6.6/firebase-messaging.js');

import firebase from "firebase/app";
import "firebase/firebase-messaging";

var firebaseConfig = {
    apiKey           : 'AIzaSyAasayyZGe0v9czhyO0dopGgramFZVgHls',
    authDomain       : 'group-chat-vue.firebaseapp.com',
    projectId        : 'group-chat-vue',
    storageBucket    : 'group-chat-vue.appspot.com',
    messagingSenderId: '621063914937',
    appId            : '1:621063914937:web:056fc05389f0a9bd8b6268',
};

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging();

// export default messaging

// const app = firebase.initializeApp(firebaseConfig)

messaging.usePublicVapidKey('BAp1EEtP_bHWJ2nSnho-Q_T1ye3rz7YMCK35cUv19whZc3rT3IJt1wfjQMCh-ZMeQ5sOwUBL52ETEXuIXdpV_Pg');

// request permission of push notification:
messaging.requestPermission().then(() => {
    console.log('Notification permission granted.');

    // Get Token
    messaging.getToken().then((token) => {
        console.log(token)
    })
}).catch((err) => {
    console.log('Unable to get permission to notify.', err);
});
