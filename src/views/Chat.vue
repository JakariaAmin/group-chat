<template>
  <div class = "chat-screen">
    <!--header-->
    <app-bar-chat/>

    <!--chat list-->
    <v-list>
      <template v-for = "(item, index) in $store.state.chat.chats">
        <!--section: message and time-->
        <v-list-item
            :key = "item.id"
            :class = "[
                'chat-item',
                item.user.id === $store.state.user.id && 'chat-item-own',
                ($store.state.chat.chats[index - 1] && item.user.id !== $store.state.chat.chats[index - 1].user.id) && 'chat-item-margin'
            ]"
        >
          <div class = "chat-message">{{ item.message }}</div>

          <!--section: time and status-->
          <div class = "chat-time-status">
            <div class = "chat-time">{{ item.timestamp }}</div>
            <my-image v-if = "item.user.id === $store.state.user.id" :src = "getStatusImage(item.status)" classes = "chat-status"/>
          </div>

        </v-list-item>

      </template>
    </v-list>

    <!--bottom section consists of message send text input and icons-->
    <div class = "bottom-section">

      <!--text input container with icons-->
      <div class = "text-input-container">
        <!--emoji btn-->
        <v-btn icon @click = "snackbar = true">
          <my-image src = "emoji_people.png"/>
        </v-btn>

        <!--text input to send message-->
        <input v-model = "message" :placeholder = "$vuetify.lang.t('$vuetify.Message')">

        <!--attachment btn-->
        <v-btn icon @click = "snackbar = true">
          <my-image src = "ib_attach.png"/>
        </v-btn>

        <!--camera btn-->
        <v-btn icon @click = "snackbar = true">
          <my-image src = "ic_camera.png"/>
        </v-btn>
      </div>

      <!--mic button to record audio message-->
      <v-btn icon rounded color = "white" x-large elevation = "2" class = "btn-mic">
        <my-image src = "ic_mic.png"/>
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
      {{ $vuetify.lang.t('$vuetify.FeatureNotReadyYet') }}
    </v-snackbar>
  </div>

</template>

<script lang = "ts">
import Vue from "vue";
import AppBarChat from "@/components/appbar/Chat.vue";
import MyImage from "@/components/MyImage.vue";
import {ChatStatus} from "@/data/enum/ChatStatus";

export default Vue.extend(
    {
      name: 'Chat',

      components: {AppBarChat, MyImage},

      data: () => ({
        snackbar: false,
        message : '',

        timeout : 0, // timeout id.
        duration: 3000, // how long user should stay on screen before statues set to unread.
      }),

      mounted() {
        // set all unread message to read once user open screen stays for [this.duration] screen:
        this.timeout = setTimeout(() => {
          this.$store.dispatch('chat/setRead');
        }, this.duration);
      },

      beforeDestroy() {
        // clear timeout and don't update message statuses to unread if user doesn't stay for [this.duration] seconds:
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
      },

      methods: {
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
        }
      }
    })
</script>

<style scoped lang = "scss">
.chat-screen {
  height           : 100%;
  background-color : #F3EDE7;
}

.v-list {
  display          : flex;
  flex-direction   : column;
  align-items      : flex-start;

  background-color : #F3EDE7;
  padding          : 60px 16px 60px 16px; // top header fixed size. and bottom text input section.

  .chat-item {
    display          : flex;
    flex-direction   : row;
    align-items      : flex-start;
    flex-wrap        : wrap;

    min-height       : auto;

    border-radius    : 16px;
    padding          : 8px 12px 2px;
    margin           : 1.5px 0;
    max-width        : 90%;

    background-color : white;
    box-shadow       : 0 1px rgba(0, 0, 0, 0.10);

    .chat-message {
      font-size   : 16px;
      color       : #121B21;
      line-height : 1.25;
    }

    .chat-time-status {
      //flex-grow      : 1;
      //flex-shrink    : 0;

      display        : flex;
      flex-direction : row;
      align-items    : center;

      margin-left    : 10px;
      margin-top     : 6px;

      .chat-time {
        //flex-grow   : 1;
        //flex-shrink : 0;

        font-size : 13px;
        color     : #667978;
      }

      .chat-status {
        width       : 16px;
        max-width   : 16px;

        object-fit  : contain;

        margin-left : 5px;
      }
    }
  }

  .chat-item::after {
    border-width : 0 0 10px 10px;
    border-color : transparent transparent transparent #e1ffc7;
    top          : 0;
    right        : -10px;
  }

  // differences for own chat message: background color and time text color:
  .chat-item-own {
    align-self       : flex-end;
    background-color : #E7FFDC;

    .chat-message {
      color : black;
    }

    .chat-time {
      color : #69767F;
    }
  }

  // add extra top margin if messages are not from same person:
  .chat-item-margin {
    margin-top : 8px;
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
    background-color : white;
    border-radius    : 25px;

    margin-right     : 5px;
    padding          : 7px 8px 7px 4px;

    box-shadow       : 0 1px rgba(0, 0, 0, 0.08) !important;

    .v-btn {
      .v-image {
        width     : 26px;
        max-width : 26px;
      }
    }

    input {
      flex        : 1;

      font-weight : map-get($roboto-weights, medium);
      font-size   : 17px;
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
}

</style>
