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
            <v-img :src = "user.avatar" alt = "chat-avatar"></v-img>
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

            <div class = "chat-count">{{ countUnread(user.chats) }}</div>
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
        @click = "snackbar = true"
    >
      <my-image src = "ic_settings_chats.png"/>
    </v-btn>

    <!--snackbar to display alert/notification message-->
    <v-snackbar
        v-model = "snackbar"
        color = "primary"
        elevation = "16"
        class = "snackbar"
    >
      {{ $vuetify.lang.t('$vuetify.FeatureNotReadyYet') }}
    </v-snackbar>
  </div>

</template>

<script lang = "ts">
import Vue from "vue";
import MyImage from "@/components/MyImage.vue";
import Chat from "@/data/interface/Chat";
import {ChatStatus} from "@/data/enum/ChatStatus";
import User from "@/data/interface/User";

export default Vue.extend(
    {
      name      : 'Chats',
      components: {MyImage},

      data: () => ({
        snackbar: false,
      }),

      methods: {
        // count total number of unread message:
        countUnread(chats: Chat[]) {
          return chats?.reduce((count, chat) => chat.status !== ChatStatus.read ? ++count : count, 0);
        },

        // go to chat screen of target user:
        toChatScreen(user: User) {
          // store chats data in vuex store before navigating to chat screen:
          this.$store.dispatch('chat/initUser', user)
              .then(() => {
                console.log('toChatScreen: ', this.$store.state.chat);
                this.$router.push({path: '/home/chats/' + user.id})
              });
        }
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
