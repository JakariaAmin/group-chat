<template>
  <div class = "chat-screen">
    <!--header-->
    <app-bar-chat/>

    <!--    <q-virtual-scroll
            :items = "$store.state.chat.chats"
            class = "my-list"
            ref = "myScroll"
        >
          <template v-slot = "{ item, index }">-->

    <q-infinite-scroll
        :offset = "250"
        reverse
        @load = "onLoad"
        class = "my-list"
    >
      <!--list loading icon-->
      <template slot = "loading">
        <!--        <div class = "list-loader" v-if = "$store.state.chat.chats && $store.state.chat.chats.length < maxChats">
                  <q-spinner color = "primary" name = "dots" size = "24px"/>
                </div>-->

        <div class = "title-loading" v-if = "$store.state.chat.chats && $store.state.chat.chats.length < maxChats">
          {{ $vuetify.lang.t('$vuetify.LoadingConversations') }}
        </div>

        <div class = "title-loading" v-else>
          {{ $vuetify.lang.t('$vuetify.NoMoreConversationToLoad') }}
        </div>
      </template>

      <!--chat message container-->
      <div
          v-for = "(item, index) in $store.state.chat.chats"
          :key = "index"
          :class = "[
                    'message-container',
                    item.user.id === $store.state.user.id ? 'sent' : 'received',
                   (index === 0 || ($store.state.chat.chats[index - 1] && item.user.id !== $store.state.chat.chats[index - 1].user.id)) && 'message-container-margin'
                ]"
      >
        <div class = "message">{{ item.message }}</div>

        <!--section: time and status image-->
        <div class = "message-time-status">
          <div class = "message-time">{{ item.timestamp }}</div>

          <my-image
              v-if = "item.user.id === $store.state.user.id"
              :src = "getStatusImage(item.status)"
              classes = "message-status"
          />
        </div>
      </div>
    </q-infinite-scroll>

    <!--      </template>

          <template slot = "before">
            <div class = "row justify-center q-py-md" v-intersection = "onIntersection">
              <q-spinner color = "primary" name = "dots" size = "24px"/>
            </div>
          </template>
        </q-virtual-scroll>-->

    <!--chat list-->
    <!--    <DynamicScroller
            :items = "$store.state.chat.chats"
            :min-item-size = "100"
            class = "my-list"
            ref = "scroller"
            @scroll.native.passive = "handleScroll"
        >
          <template v-slot = "{ item, index, active }">
            <DynamicScrollerItem
                :item = "item"
                :active = "active"
                :size-dependencies = "[item.message]"
                :data-index = "index"
                :class = "[
                        'message-container',
                        item.user.id === $store.state.user.id ? 'sent' : 'received',
                       (index === 0 || ($store.state.chat.chats[index - 1] && item.user.id !== $store.state.chat.chats[index - 1].user.id)) && 'message-container-margin'
                    ]"
            >
              <div class = "message">{{ item.message }} [{{ index }}]</div>

              &lt;!&ndash;section: time and status image&ndash;&gt;
              <div class = "message-time-status">
                <div class = "message-time">{{ item.timestamp }}</div>

                <my-image
                    v-if = "item.user.id === $store.state.user.id"
                    :src = "getStatusImage(item.status)"
                    classes = "message-status"
                />
              </div>
            </DynamicScrollerItem>
          </template>

          &lt;!&ndash;      <template #before>
                  <div v-intersect = "onIntersect"/>
                </template>&ndash;&gt;
        </DynamicScroller>-->

    <!--    <virtual-list
            ref = "vsl"
            :data-key = "'id'"
            :data-items = "$store.state.chat.chats"
            :data-component = "itemComponent"
            :tobottom = "onScrollToBottom"
            class = "virtual-list"
            :item-class = "'virtual-list-item'"
        />-->

    <!--chat list-->
    <!--    <v-list>
          <template v-for = "(item, index) in $store.state.chat.chats">
            &lt;!&ndash;section: message and time&ndash;&gt;
            <v-list-item
                :key = "item.id"
                :class = "[
                    'message-container',
                    item.user.id === $store.state.user.id ? 'sent' : 'received',
                   (index === 0 || ($store.state.chat.chats[index - 1] && item.user.id !== $store.state.chat.chats[index - 1].user.id)) && 'message-container-margin'
                ]"
            >
              <div class = "message">{{ item.message }}</div>

              &lt;!&ndash;section: time and status&ndash;&gt;
              <div class = "message-time-status">
                <div class = "message-time">{{ item.timestamp }}</div>

                <my-image
                    v-if = "item.user.id === $store.state.user.id"
                    :src = "getStatusImage(item.status)"
                    classes = "message-status"
                />
              </div>

            </v-list-item>

          </template>
        </v-list>-->

    <!--bottom section consists of message send text input and icons-->
    <div class = "bottom-section">

      <!--text input container with icons-->
      <div class = "text-input-container">
        <!--emoji btn-->
        <v-btn icon>
          <my-image src = "emoji_people.png" classes = "img-emoji"/>
        </v-btn>

        <!--text input to send message-->
        <input v-model = "message" :placeholder = "$vuetify.lang.t('$vuetify.Message')">

        <!--attachment btn-->
        <v-btn
            icon
            @click = "snackbar = true"
            v-show = "!message || !message.length"
        >
          <my-image src = "ib_attach.png"/>
        </v-btn>

        <!--camera btn-->
        <v-btn
            icon
            @click = "snackbar = true"
        >
          <my-image src = "ic_camera.png"/>
        </v-btn>
      </div>

      <!--mic button to record audio message-->
      <v-btn
          icon
          rounded
          color = "white"
          x-large
          elevation = "2"
          :class = "[message && message.length ? 'btn-send' : 'btn-mic']"
          @click = "sendMessage"
      >
        <my-image :src = "message && message.length ? 'ic_icebreaker_send.png' : 'ic_mic.png'"/>
      </v-btn>
    </div>

    <!--snackbar to display alert/notification message-->
    <v-snackbar
        v-model = "snackbar"
        color = "primary"
        elevation = "16"
        centered
        class = "snackbar"
    >
      {{ snackbarMessage || $vuetify.lang.t('$vuetify.FeatureNotReadyYet') }}
    </v-snackbar>

    <!--emoji picker plugin-->
    <!--    <twemoji-picker-->
    <!--        :emojiData = "emojiDataAll"-->
    <!--        :emojiGroups = "emojiGroups"-->
    <!--        :skinsSelection = "false"-->
    <!--        :searchEmojisFeat = "true"-->
    <!--        searchEmojiPlaceholder = "Search here."-->
    <!--        searchEmojiNotFound = "Emojis not found."-->
    <!--        isLoadingLabel = "Loading..."-->
    <!--    ></twemoji-picker>-->
  </div>

</template>

<script lang = "ts">
import Vue from "vue";
import AppBarChat from "@/components/appbar/Chat.vue";
import {ChatStatus} from "@/data/enum/ChatStatus";
import Chat from "@/data/interface/Chat";
import moment from "moment";
import MyImage from "@/components/MyImage.vue";
import User from "@/data/interface/User";
import {randomMessages} from "@/data/mock/Messages";
import Notification from "@/data/interface/Notification";
import axios from "axios";

/*import {TwemojiPicker} from '@kevinfaguiar/vue-twemoji-picker';
import EmojiAllData from '@kevinfaguiar/vue-twemoji-picker/emoji-data/en/emoji-all-groups.json';
import EmojiDataAnimalsNature from '@kevinfaguiar/vue-twemoji-picker/emoji-data/en/emoji-group-animals-nature.json';
import EmojiDataFoodDrink from '@kevinfaguiar/vue-twemoji-picker/emoji-data/en/emoji-group-food-drink.json';
import EmojiGroups from '@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json';*/


export default Vue.extend(
    {
      name: 'Chat',

      components: {AppBarChat, MyImage},

      data: () => ({
        // send message text input model
        message: '',

        snackbar       : false,
        snackbarMessage: '',

        // how long user should stay on screen before message statues set to unread
        readDuration: 2000,
        // readTimeout id
        readTimeout: 0,

        // number of chats to add on each pagination
        take: 500,
        // maximum number of chats to add in store. please note that 100 chats will be loaded on new page load
        maxChats: 5000,

        // random message insertation -> timestamp set to 1 year earlier:
        timestampStart: moment().subtract(12, 'months'),
      }),

      /*computed: {
        emojiDataAll() {
          return EmojiAllData;
        },
        emojiGroups() {
          return EmojiGroups;
        }
      },*/

      mounted() {
        // set all unread message to read once user open screen stays for [this.duration] screen:
        this.readTimeout = setTimeout(() => {
          // get current authenticated user id, required to set own messages statues to read:
          const user: User = this.$store.state.user;

          // create notificaiton object before sending:
          const notification: Notification = {
            to  : '/topics/all', // topic name.
            data: {
              to  : 'updateStatus',
              chat: {
                id  : '',
                user: {
                  id: user.id
                }
              },
            },
          };

          // send message via firebase topic, to update read status of message:
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
                console.log('Successfully sent notification: ', response);

                // call store action:
                this.$store.dispatch('chat/setRead', user.id);

              })
              .catch((error: any) => {
                console.log('Error sending notification: ', error);
              });

          // send notification to update at recipient's side:
        }, this.readDuration);

        console.log('chats: ', {length: this.$store.state.chat.chats?.length});

        // this.scrollToBottom();
      },

      beforeDestroy() {
        // clear timeout and don't update message statuses to unread if user doesn't stay for [this.duration] seconds:
        if (this.readTimeout) {
          clearTimeout(this.readTimeout);
        }
      },

      methods: {
        // send message function:
        sendMessage() {
          if (this.message && this.message.length && this.$route.params.id) {
            // get current authenticated user:
            const user: User = this.$store.state.user;

            const targetUserId: string = this.$route.params.id;

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
                to  : targetUserId, // target user id.
                chat: chat,
              },
            };

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
                  console.log('Successfully sent message: ', response);

                  // store chat data in vuex store:
                  this.$store.dispatch('chat/pushChat', {id: targetUserId, chat: chat})
                      .then(async () => {
                        // reset text input model
                        this.message = '';

                        console.log('sendMessage: ', {length: this.$store.state.chat.chats?.length});

                        // fix for scroll to bottom not working, wait 100 ms before scrolling to bottom.
                        await new Promise((r) => setTimeout(r, 100))
                        this.scrollToBottom();
                      });
                })
                .catch((error: any) => {
                  // show alert if subscription fails:
                  console.log('Error sending message: ', error);
                  this.snackbarMessage = 'Error sending message!';
                  this.snackbar        = true;
                });

          } else {
            this.snackbar = true;
          }
        },

        // get chat status arrow image based on chat status:
        getStatusImage(status: string) {
          switch (status) {
            case ChatStatus.read:
              return 'message_got_read_receipt_from_target.png';

            case ChatStatus.delivered:
              return 'message_got_receipt_from_target.png';

            case ChatStatus.sent:
            default:
              return 'message_got_receipt_from_server.png';

          }
        },

        // handleScroll:
        onLoad(index: any, done: () => void) {
          if (this.$store.state.chat.chats && this.$store.state.chat.chats.length < this.maxChats) {
            setTimeout(() => {
              console.log('onLoad: ', this.$store.state.chat.chats.length);

              // get current authenticated user and recipient user:
              const user: User = this.$store.state.user;

              // get recipient user of this chat thread:
              const recipientUser: User = {
                id         : this.$store.state.chat.id,
                name       : this.$store.state.chat.name,
                phoneNumber: this.$store.state.chat.phoneNumber,
                avatar     : this.$store.state.chat.avatar,
              };

              // generate user list with 100 chats per turn:
              const chats: Chat[] = [];

              // generate chats with random message, time and user:
              for (let i = 0; i < this.take; i++) {
                // get random message from message array:
                const message: string = randomMessages[Math.floor((Math.random() * randomMessages.length)) | 0];

                // randomly decide if this message is sent by authenticated user or recipient user:
                const isOwnMessage: boolean = Math.random() < 0.5;

                // prepare chat object:
                chats[i] = {
                  id       : this.uuidv4(),
                  message  : message,
                  timestamp: this.timestampStart.add(i, 'hours').format('h:mm a'),
                  status   : ChatStatus.read,
                  user     : isOwnMessage ? user : recipientUser,
                }
              }

              // store chats array in vuex store:
              this.$store.dispatch('chat/pushChats', chats)
                  .then(() => {
                    done();

                    // show toast about how many new chats are added in current thread:
                    this.snackbarMessage = 'Total messages: ' + this.$store.state.chat.chats?.length;
                    this.snackbar        = true;

                    console.log('generateChats: ', {length: this.$store.state.chat.chats?.length});
                  });
            }, 300);
          }
        },

        /*onIntersection(entry: any) {
          console.log('onIntersection: ', entry.isIntersecting, this.loadingMore);

          if (entry.isIntersecting && !this.loadingMore && this.$store.state.chat.chats?.length < 5000) {
            setTimeout(() => {
              // get current authenticated user and recipient user:
              const user: User          = this.$store.state.user;
              const recipientUser: User = {
                id         : this.$store.state.chat.id,
                name       : this.$store.state.chat.name,
                phoneNumber: this.$store.state.chat.phoneNumber,
                avatar     : this.$store.state.chat.avatar,
              };

              // generate user list with 100 chats per turn:
              const chats: Chat[] = [];

              // generate chats with random message, time and user:
              for (let i = 0; i < 500; i++) {
                const message: string = randomMessages[Math.floor((Math.random() * randomMessages.length)) | 0];

                // randomly decide if this message is sent by authenticated user or other user:
                const isOwnMessage: boolean = Math.random() < 0.5;

                chats[i] = {
                  id       : this.uuidv4(),
                  message  : message,
                  timestamp: this.timestampStart.add(i, 'hours').format('h:mm a'),
                  status   : ChatStatus.read,
                  user     : isOwnMessage ? user : recipientUser,
                }
              }

              // store chats data in vuex store:
              this.$store.dispatch('chat/pushChats', chats)
                  .then(() => {
                    this.loadingMore = false;

                    console.log('generateChats: ', {chats});
                    console.log('generateChats: ', {length: this.$store.state.chat.chats?.length});
                  });
            }, 500)
          }
        },*/

        // handleScroll:
        /*handleScroll(e: {target: any;}) {
          // onIntersect(e: any) {

          // stop adding new chats once it reaches 5000:
          if (!this.loadingMore && this.$store.state.chat.chats?.length < 5000) {
            console.log('handleScroll 1: ');

            const {target}      = e;
            const currentScroll = target.scrollTop;

            // scroll once user reaches within 1000 pixel of top part of screen:
            if (currentScroll <= 1000) {
              this.generateChats();
            }
          }
        },*/

        // generate conversation of 100 per turn:
        /*generateChats() {
          this.loadingMore = true;

          // get current authenticated user and recipient user:
          const user: User          = this.$store.state.user;
          const recipientUser: User = {
            id         : this.$store.state.chat.id,
            name       : this.$store.state.chat.name,
            phoneNumber: this.$store.state.chat.phoneNumber,
            avatar     : this.$store.state.chat.avatar,
          };

          // generate user list with 100 chats per turn:
          const chats: Chat[] = [];

          // generate chats with random message, time and user:
          for (let i = 0; i < 100; i++) {
            const message: string = randomMessages[Math.floor((Math.random() * randomMessages.length)) | 0];

            // randomly decide if this message is sent by authenticated user or other user:
            const isOwnMessage: boolean = Math.random() < 0.5;

            chats[i] = {
              id       : this.uuidv4(),
              message  : message,
              timestamp: this.timestampStart.add(i, 'hours').format('h:mm a'),
              status   : ChatStatus.read,
              user     : isOwnMessage ? user : recipientUser,
            }
          }

          // store chats data in vuex store:
          this.$store.dispatch('chat/pushChats', chats)
              .then(() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // this.$refs.scroller?.scrollToItem();

                // delay for 3 second before receiving next scroll event::
                // setTimeout(() => {
                this.loadingMore = false;
                // }, 3000);

                console.log('generateChats: ', {chats});
                console.log('generateChats: ', {length: this.$store.state.chat.chats?.length});
              });
        },*/

        // generate random uuid:
        uuidv4() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        },

        // scroll to bottom of screen:
        scrollToBottom() {
          window.scrollTo({top: document.body.scrollHeight || document.documentElement.scrollHeight, behavior: 'smooth'});
        },
      }
    })
</script>

<style lang = "scss">
.chat-screen {
  background-color : #F3EDE7;
  height           : 100%;
}

.my-list {
  //height         : 100vh; // 56px = top tab bar height.
  margin-top     : 56px; // 56px
  padding        : 0 16px 6px; // top header fixed size. and bottom text input section.

  display        : flex;
  flex-direction : column;
  align-items    : flex-start;

  .q-infinite-scroll__loading {
    margin : 0 auto;

    .list-loader {
      padding : 12px;
    }

    .title-loading {
      padding    : 12px 10px 6px;
      text-align : center;
    }
  }

  //.q-virtual-scroll__content {

  .message-container {
    display     : block;

    line-height : 1; // fix for vuetify.
    min-height  : auto;

    padding     : 7px 12px;
    margin      : 1.5px 0;
    max-width   : 90%;

    filter      : drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.20)); // for shape shadow.

    .message {
      display     : inline-block;

      font-size   : 16px;
      line-height : 1.25;
    }

    .message-time-status {
      display     : inline-block;
      float       : right;
      position    : relative;
      bottom      : -4px;

      line-height : 1.25; // fix for vuetify.
      margin-left : 10px;

      .message-time {
        display   : inline-block;

        font-size : 13px;
      }

      .message-status {
        display     : inline-block;

        width       : 16px;
        max-width   : 16px;

        object-fit  : contain;

        margin-left : 5px;
      }
    }
  }

  // differences for received chat message: background color and time text color:
  .received {
    //float            : left;
    background-color : white;
    border-radius    : 0px 5px 5px 5px;

    .message-message {
      color : #121B21;
    }

    .message-time {
      color : #69767F;
    }
  }

  // differences for own chat message: background color and time text color:
  .sent {
    //float            : right;
    align-self       : flex-end;
    background-color : #E7FFDC;
    border-radius    : 5px 0px 5px 5px;

    .message-message {
      color : black;
    }

    .message-time {
      color : #667978;
    }
  }

  // add extra top margin if messages are not from same person:
  .message-container-margin {
    margin-top : 8px;

    // top arrow shape, for both left and right component:
    // idea taken from: https://codepen.io/swaibu/pen/YjrPVJ
    &:after {
      position     : absolute;
      content      : "";
      width        : 0;
      height       : 0;
      border-style : solid;
    }

    // top arrow shape for received component:
    &.received:after {
      border-width : 0px 10px 10px 0;
      border-color : transparent #fff transparent transparent;
      top          : 0;
      left         : -10px;
    }

    // top arrow shape for sent component:
    &.sent:after {
      border-width : 0px 0 10px 10px;
      border-color : transparent transparent transparent #e1ffc7;
      top          : 0;
      right        : -10px;
    }
  }
}

.bottom-section {
  position       : fixed;

  left           : 5px;
  right          : 5px;
  bottom         : 5px;

  display        : flex;
  flex-direction : row;
  align-items    : center;

  .text-input-container {
    display          : flex;
    flex-direction   : row;
    align-items      : center;

    flex             : 1;
    width            : 80%;
    //max-width        : calc(100% - 57px);

    background-color : white;
    border-radius    : 25px;

    margin-right     : 5px;
    padding          : 7px 8px 7px 6px;

    box-shadow       : 0 0 2px rgba(0, 0, 0, 0.20) !important;

    .v-btn {
      .v-image {
        width      : 26px;
        max-width  : 26px;

        transition : all 0.25s ease;
      }

      .img-emoji {
        width     : 30px;
        max-width : 30px;
      }
    }

    input {
      flex        : 1;
      //max-width   : calc(100% - 57px);
      overflow    : hidden; // fix for input taking too much space.

      margin-left : 4px;

      font-size   : 18px;
      color       : black;

      caret-color : $primary_light;
    }

    input:focus, textarea:focus {
      outline      : none !important;
      border-color : transparent;
    }
  }

  .btn-mic {
    background-color : $primary_light;

    .v-image {
      width     : 16px;
      max-width : 16px;
    }
  }

  .btn-send {
    background-color : $primary_light;

    .v-image {
      height    : 24px;
      width     : 24px;
      max-width : 24px;
    }
  }
}

</style>
