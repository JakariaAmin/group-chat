// import { initializeApp } from "firebase/app";

if ('function' === typeof importScripts) {
    importScripts('https://www.gstatic.com/firebasejs/8.4.3/firebase-app.js');
    importScripts('https://www.gstatic.com/firebasejs/8.4.3/firebase-messaging.js');

    const firebaseConfig = {
        apiKey           : 'AIzaSyAasayyZGe0v9czhyO0dopGgramFZVgHls',
        authDomain       : 'group-chat-vue.firebaseapp.com',
        projectId        : 'group-chat-vue',
        storageBucket    : 'group-chat-vue.appspot.com',
        messagingSenderId: '621063914937',
        appId            : '1:621063914937:web:056fc05389f0a9bd8b6268',
    };

    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();

    // If you would like to customize notifications that are received in the
    // background (Web app is closed or not in browser focus) then you should
    // implement this optional method.
    // Keep in mind that FCM will still show notification messages automatically
    // and you should use data messages for custom notifications.
    // For more info see:
    // https://firebase.google.com/docs/cloud-messaging/concept-options

    messaging.onBackgroundMessage(function (payload) {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
        // Customize notification here
        const notificationTitle = 'GroupChat VueJS 2';
        const notificationOptions = {
            body: 'Background Message body.',
            icon: '/firebase-logo.png'
        };

        self.registration.showNotification(notificationTitle, notificationOptions);
    });
}
