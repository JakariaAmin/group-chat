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

export default firebase.messaging();


/*export default async function firebaseInitialize () {
    var firebaseConfig = {
        apiKey           : 'AIzaSyAasayyZGe0v9czhyO0dopGgramFZVgHls',
        authDomain       : 'group-chat-vue.firebaseapp.com',
        projectId        : 'group-chat-vue',
        storageBucket    : 'group-chat-vue.appspot.com',
        messagingSenderId: '621063914937',
        appId            : '1:621063914937:web:056fc05389f0a9bd8b6268',
    };

    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();

    // request permission of push notification:
    messaging.requestPermission()
        .then(() => {
            console.log('Notification permission granted.');

            // gGet token:
            messaging
                .getToken({ vapidKey: 'BAp1EEtP_bHWJ2nSnho-Q_T1ye3rz7YMCK35cUv19whZc3rT3IJt1wfjQMCh-ZMeQ5sOwUBL52ETEXuIXdpV_Pg' })
                .then((currentToken) => {
                    if (currentToken) {
                        console.log('currentToken: ', currentToken);

                    } else {
                        console.log('No registration token available. Request permission to generate one.');
                    }
                })
                .catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                });
        })
        .catch((err) => {
            console.log('Unable to get permission to notify.', err);
            alert('Permission not granted, live chat will not work.\nPlease enable it from site settings.')
        });


    messaging
        .onMessage(function (payload) {
            console.log('Receiving foreground message');
            console.log('payload: ', payload);

            var notificationTitle = 'vue-cometchat-firebase';
            var notificationOptions = {
                body: payload.data.alert,
                icon: '',
            };

            var notification = new Notification(notificationTitle, notificationOptions);
            notification.onclick = function (event) {
                notification.close();
                console.log(event);
            };
        });
}*/
