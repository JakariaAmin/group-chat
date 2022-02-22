<template>
  <v-app>
    <v-main>

      <!--router view-->
      <router-view></router-view>

    </v-main>
  </v-app>
</template>

<script lang = "ts">
import Vue from "vue";
import axios from "axios";
import Chat from "@/data/interface/Chat";
import User from "@/data/interface/User";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import firebaseInitialize from './firebase';

export default Vue.extend(
    {
      name: 'App',

      mounted() {
        // request notification permission:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.$messaging.requestPermission()
            .then(() => {
              console.log('Notification permission granted.');

              // get token:
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              this.$messaging
                  .getToken({vapidKey: 'BAp1EEtP_bHWJ2nSnho-Q_T1ye3rz7YMCK35cUv19whZc3rT3IJt1wfjQMCh-ZMeQ5sOwUBL52ETEXuIXdpV_Pg'})
                  .then((token: any) => {
                    // token generated:
                    if (token) {
                      console.log('token: ', token);

                      // subscribe to topic. This is important to receive notification as this app doesn't connect to any backends.
                      // too little time, remove server key and delete project for security reason.
                      axios
                          .post('https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/all',
                                {},
                                {
                                  headers: {
                                    'Authorization': 'key=AAAAkJpLRbk:APA91bHnXjrDEoIInitUhNCn-yL1igZPJ5MfC6-2wkbvpBx9D3pXSQUbTsWclxVIOxIfqLbJZ-A8b92lqqPuAqoxGZerIFBeiddIG9feJ80rnxn1yqCYPlrO-nxgsTrG_DBE4j1MVJIt'
                                  }
                                },
                          )
                          .then(response => {
                            console.log('Successfully subscribed to topic:', response);
                          })
                          .catch((error: any) => {
                            // show alert if subscription fails:
                            console.log('Error subscribing to topic:', error);
                            alert('Firebase configuration failed, live chat will not work.');
                          })

                    } else {
                      // show alert if token generation fails:
                      console.log('No registration token available. Request permission to generate one.');
                      alert('No registration token available. Request permission to generate one.');
                    }
                  })
                  .catch((err: any) => {
                    // show alert if token generation fails:
                    console.log('An error occurred while retrieving token. ', err);
                    alert('Firebase configuration failed, live chat will not work.');
                  });


              // on foreground notification message:
              // store in store: either as 1. as new thread, 2 push to chat stream:
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              this.$messaging
                  .onMessage((payload: any) => {
                    console.log('Receiving foreground message: ', {payload});

                    if (payload.data?.to && payload.data.chat) {
                      const to: string = payload.data.to;
                      const chat: Chat = JSON.parse(payload.data.chat);

                      // get current authenticated user id:
                      const user: User = this.$store.state.user;

                      const from: string | undefined = chat.user?.id;

                      console.log('Receiving foreground message: ', {to, from, user, chat});

                      // stop processing if current user broadcasted/sent message.
                      if (from && from === user.id) {
                        return;
                      }

                      if (to === 'all') {
                        // if it was broadcast message
                        // and existing thread with target user doesn't exists in store,
                        // create new chat thread in chats screen.
                        // otherwise insert into existing thread.

                        // call store action:
                        this.$store.dispatch('chats/addUser', {id: from, chat: chat});

                      } else if (to === 'updateStatus') {
                        // if requested to update read status of messages:
                        this.$store.dispatch('chat/setRead', from);

                      } else if (to.length) {
                        // if it is 1 to 1 chat, insert into chat stream:
                        this.$store.dispatch('chats/addUser', {id: to, chat: chat})
                            .then(() => {
                              // update chat module too.
                              // as chat module can get too large 5000+ chats, had to se 2 module, 1 for users 1 for chats.
                              // find solution to improve this part and use 1 state rather than 2.
                              this.$store.dispatch('chat/pushThreadChat', chat);
                            });
                      }
                    }
                  });
            })
            .catch((err: any) => {
              console.log('Unable to get permission to notify.', err);
              alert('Permission not granted, live chat will not work.\nPlease enable it from site settings.');
            });
      }
    });
</script>

<style lang = "scss">
#app {
  font-family             : $roboto;
  -webkit-font-smoothing  : antialiased;
  -moz-osx-font-smoothing : grayscale;
}

// global styles avaialable everywhere in app:
.app-bar {
  box-shadow : 0px 2px 10px 0 rgba(0, 0, 0, 0.10) !important;
}

.menu-list {
  padding   : 4px 0 !important;
  right     : 4px;

  min-width : 220px;

  .v-list-item {
    padding-left  : 18px;
    padding-right : 20px;
  }
}

.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
  box-shadow : 0px 3px 5px -1px rgb(0 0 0 / 6%), 0px 6px 10px 0px rgb(0 0 0 / 5%), 0px 1px 18px 0px rgb(0 0 0 / 4%) !important;
}

// page transition:
.fade-enter-active,
.fade-leave-active {
  transition-duration        : 0.3s;
  transition-property        : opacity;
  transition-timing-function : ease;
}

.fade-enter,
.fade-leave-active {
  opacity : 0
}
</style>
