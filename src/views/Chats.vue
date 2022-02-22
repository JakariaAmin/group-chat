<template>
  <div>

    <!--list item archived-->
    <v-list-item key = "archived" class = "item-archived" @click = "snackbar = true">
      <!--archived icon-->
      <v-list-item-avatar class = "chat-avatar">
        <my-image src = "ic_archive_chatcell.png"/>
      </v-list-item-avatar>

      <!--archived text-->
      <v-list-item-content>
        <div class = "title-archived">Archived</div>
      </v-list-item-content>
    </v-list-item>

    <!--user list-->
    <v-list two-line>
      <template v-for = "(user) in $store.state.chats">
        <v-list-item :key = "user.id" @click = "toChatScreen(user)">

          <!--user photo-->
          <v-list-item-avatar class = "chat-avatar">
            <v-img :src = "user.avatar" v-on:error = "user.avatar = require('@/assets/images/3x/user.png')" alt = "chat-avatar"></v-img>
          </v-list-item-avatar>

          <!--section: name and message-->
          <v-list-item-content>
            <div class = "chat-title">{{ user.name }}</div>

            <v-list-item-subtitle class = "chat-subtitle">
              {{ user.chats[user.chats.length - 1].message }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <!--section: time and unread count-->
          <v-list-item-action>
            <div :class = "['chat-time', countUnread(user.chats) ? 'unread' : '' ]">{{ user.chats[user.chats.length - 1].timestamp }}</div>

            <div class = "chat-count" v-if = "countUnread(user.chats)">{{ countUnread(user.chats) }}</div>
          </v-list-item-action>

        </v-list-item>

      </template>
    </v-list>

    <!--floating action button at bottom right corner-->
    <v-btn
        fab
        fixed
        dark
        color = "primary_light"
        bottom
        right
        elevation = "10"
        @click = "dialog = true"
    >
      <my-image src = "ic_settings_chats.png"/>
    </v-btn>

    <!--broadcast success dialog-->
    <v-dialog
        v-model = "dialogBroadcast"
        persistent
        max-width = "480"
    >
      <v-card>
        <v-card-title class = "text-h5">
          {{ $vuetify.lang.t('$vuetify.MessageSent') }}
        </v-card-title>

        <v-card-text>
          <div class = "text--accent-1 pt-4">{{ $vuetify.lang.t('$vuetify.BroadcastSuccess') }}</div>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn color = "error" text @click = "dialogBroadcast = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--dialog to send message to everyone-->
    <v-dialog
        v-model = "dialog"
        transition = "dialog-bottom-transition"
        max-width = "600"
    >
      <template>
        <v-card>
          <v-toolbar
              color = "primary"
              dark
          >
            {{ $vuetify.lang.t('$vuetify.CreateNewChat') }}
          </v-toolbar>

          <v-card-text>
            <div class = "text--accent-1 pt-4 text-center">{{ $vuetify.lang.t('$vuetify.CreateNewChatDesc') }}</div>
          </v-card-text>

          <!--broadcast message form-->
          <v-form
              ref = "form"
              v-model = "valid"
              lazy-validation
              class = "px-6 pb-4"
          >
            <!--text input to send message-->
            <v-text-field
                v-model = "message"
                :label = "$vuetify.lang.t('$vuetify.Message')"
                :placeholder = "$vuetify.lang.t('$vuetify.EnterMessage')"
                :rules = "rulesMessage"
                required
                class = "py-2"
            />
            <!--broadcast message button-->
            <v-btn
                color = "primary"
                block
                elevation = "6"
                @click = "broadcastMessage"
            >
              {{ $vuetify.lang.t('$vuetify.Broadcast') }}
            </v-btn>
          </v-form>

        </v-card>
      </template>
    </v-dialog>

    <!--snackbar to display alert/notification message-->
    <v-snackbar
        v-model = "snackbar"
        color = "primary"
        elevation = "16"
        class = "snackbar"
    >
      {{ snackbarMessage || $vuetify.lang.t('$vuetify.FeatureNotReadyYet') }}
    </v-snackbar>

  </div>

</template>

<script lang = "ts">
import Vue from "vue";
import MyImage from "@/components/MyImage.vue";
import Chat from "@/data/interface/Chat";
import {ChatStatus} from "@/data/enum/ChatStatus";
import User from "@/data/interface/User";
import Notification from "@/data/interface/Notification";
import axios from "axios";
import moment from "moment";

export default Vue.extend(
    {
      name      : 'Chats',
      components: {MyImage},

      data: () => ({
        snackbar       : false,
        snackbarMessage: '',

        // used for sending message:
        dialog: false,
        // used for showing success message:
        dialogBroadcast: false,

        // form fields and validation rules:
        valid  : false,
        message: '',

        rulesMessage: [
          (value: string) => !!value || 'Message is required.',
          (value: string) => (value || '').length >= 1 || 'Message must be min 1 characters',
          (value: string) => (value || '').length <= 500 || 'Message can not be more than 500 characters',
        ],
      }),

      methods: {
        // count total number of unread message:
        countUnread(chats: Chat[]) {
          const user: User = this.$store.state.user;

          return chats?.reduce((count, chat) => chat.user?.id !== user.id && chat.status !== ChatStatus.read ? ++count : count, 0);
        },

        // go to chat screen of target user:
        toChatScreen(user: User) {
          const newUser: User = {
            id         : user.id,
            name       : user.name,
            phoneNumber: user.phoneNumber,
            avatar     : user.avatar,
            chats      : user.chats?.slice(-100),
          };

          // store chats data in vuex store before navigating to chat screen:
          this.$store.dispatch('chat/initUser', newUser)
              .then(() => {
                // console.log('toChatScreen: ', this.$store.state.chat);

                this.$router.push({path: '/home/chats/' + user.id, params: {id: user.id}});
              });
        },

        broadcastMessage() {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore:

          // once form is valid: continue broadcasting message:
          if (this.$refs.form.validate()) {
            // get current authenticated user:
            const user: User = this.$store.state.user;

            // create chat object:
            const chat: Chat = {
              id       : this.uuidv4(),
              message  : this.message,
              timestamp: moment().format('h:mm a'),
              status   : ChatStatus.sent,
              user     : user,
            };

            // create notificaiton object before sending:
            const notification: Notification = {
              to          : '/topics/all', // topic name.
              notification: {
                title   : user.name + ' sent you a message',
                body    : this.message,
                sound   : true,
                priority: 'high',
              },
              data        : {
                to  : 'all', // since this is broadcast, no user id specified.
                chat: chat,
              },
            };

            // hide dialog and reset message text input:
            this.dialog  = false;
            this.message = '';

            // send message via firebase topic, becasuse this app doesn't have backend and database:
            axios
                .post('https://fcm.googleapis.com/fcm/send',
                      notification,
                      {
                        headers: {
                          'Authorization': 'key=AAAAkJpLRbk:APA91bHnXjrDEoIInitUhNCn-yL1igZPJ5MfC6-2wkbvpBx9D3pXSQUbTsWclxVIOxIfqLbJZ-A8b92lqqPuAqoxGZerIFBeiddIG9feJ80rnxn1yqCYPlrO-nxgsTrG_DBE4j1MVJIt'
                        }
                      },
                )
                .then(response => {
                  console.log('Successfully broadcasted message: ', response);
                  this.dialogBroadcast = true;
                })
                .catch((error: any) => {
                  // show alert if subscription fails:
                  console.log('Error broadcasting message: ', error);
                  this.snackbarMessage = 'Error broadcasting message!';
                  this.snackbar        = true;
                });
          }
        },

        // generate random uuid:
        uuidv4() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        },
      }
    })
</script>

<style scoped lang = "scss">
.item-archived {
  .v-avatar {
    margin : 8px 0 0;

    .v-image {
      height     : 26px;
      width      : 26px;
      max-width  : 26px;

      object-fit : contain;
    }
  }

  .title-archived {
    font-weight : map-get($roboto-weights, medium);
    font-size   : 17.5px;
    color       : black;

    margin      : 8px 20px 0 0px;
  }
}

.v-list {
  padding-top : 0;

  .v-list-item__action--stack {
    justify-content : flex-start;
  }
}

.chat-avatar {
  height       : 50px !important;
  width        : 50px !important;

  margin-right : 18px !important;
}

.chat-title {
  font-weight : map-get($roboto-weights, medium);
  font-size   : 17.5px;
  color       : black;
}

.chat-subtitle {
  font-weight : map-get($roboto-weights, regular);
  font-size   : 14.5px;
  color       : $user_message !important;

  margin-top  : 5px;
}

.chat-time {
  font-weight    : map-get($roboto-weights, regular);
  font-size      : 13px;
  color          : $user_message;
  letter-spacing : 0.4px;

  &.unread {
    font-weight : map-get($roboto-weights, medium);
    color       : $primary_light;
  }
}

.chat-count {
  display          : flex;
  flex-direction   : column;
  justify-content  : center;
  align-items      : center;

  margin-left      : 6px;
  margin-top       : 4px;

  height           : 20px;
  border-radius    : 10px;
  padding-left     : 6px;
  padding-right    : 6px;

  background-color : $unread_count;

  font-family      : $roboto;
  font-weight      : map-get($roboto-weights, bold);
  font-size        : 12px;
  color            : white;
}

.v-btn--fab .v-image {
  height    : 26px;
  width     : 26px;
  max-width : 26px;
}
</style>
