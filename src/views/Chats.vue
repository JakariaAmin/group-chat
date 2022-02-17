<template>
  <div>
    <v-list-item key = "archived" class = "item-archived" @click = "snackbar = true">
      <!--archived icon-->
      <v-list-item-avatar class = "chat-avatar">
        <v-icon class = "archive-icon">$vuetify.icons.archive</v-icon>
      </v-list-item-avatar>

      <!--archived text-->
      <v-list-item-content>
        <div class = "title-archived">Archived</div>
      </v-list-item-content>
    </v-list-item>

    <!--user list of chat-->
    <v-list two-line>
      <template v-for = "(item) in users">
        <v-list-item :key = "item.title" @click = "snackbar = true">

          <!--user photo-->
          <v-list-item-avatar class = "chat-avatar">
            <v-img :src = "item.avatar" alt = "chat-avatar"></v-img>
          </v-list-item-avatar>

          <!--section: title and subtitle-->
          <v-list-item-content>
            <div class = "chat-title">{{ item.title }}</div>

            <v-list-item-subtitle class = "chat-subtitle">{{ item.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>

          <!--section: time and unread count-->
          <v-list-item-action>
            <div :class = "['chat-time', item.unread ? 'unread' : '' ]">{{ item.time }}</div>

            <div class = "chat-count" v-if = "item.unread">{{ item.unread }}</div>
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
      <v-icon>$vuetify.icons.message</v-icon>
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
import Vue from 'vue'

export default Vue.extend(
    {
      name: 'Chats',

      components: {},

      data: () => ({
        snackbar: false,

        users: [
          {
            avatar  : 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title   : 'User A',
            subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
            time    : '6:50 pm',
            unread  : 2,
          },
          {
            avatar  : 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title   : 'User B',
            subtitle: `Wish I could come, but I'm out of town this weekend.`,
            time    : '4:30 pm',
            unread  : 0,
          },
          {
            avatar  : 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title   : 'User C',
            subtitle: `Do you have Paris recommendations? Have you ever been?`,
            time    : '3:25 pm',
            unread  : 6,
          },
          {
            avatar  : 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
            title   : 'User D',
            subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
            time    : '1:20 pm',
            unread  : 9,
          },
          {
            avatar  : 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            title   : 'User E',
            subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
            time    : '1:10 pm',
            unread  : 0,
          },
        ],
      }),
    })
</script>

<style scoped lang = "scss">
.item-archived {
  .v-avatar {
    margin : 0;
  }
}

.archive-icon {
  color         : $primary;

  border-radius : 0px;
  width         : 20px;
  height        : 20px;

  margin-top    : 12px;
}

.title-archived {
  font-weight : map-get($roboto-weights, medium);
  font-size   : 17px;
  color       : black;

  margin      : 8px 20px 0 0px;
}

.chat-avatar {
  height       : 50px !important;
  width        : 50px !important;

  margin-right : 18px !important;
}

.chat-title {
  font-weight   : map-get($roboto-weights, medium);
  font-size     : 17px;
  color         : black;

  margin-bottom : 6px;
}

.chat-subtitle {
  font-weight : map-get($roboto-weights, regular);
  font-size   : 14px;
  color       : $user_message !important;
}

.v-list-item__action--stack {
  justify-content : flex-start;
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
  color            : white;

  font-family      : $roboto;
  font-weight      : map-get($roboto-weights, bold);
  font-size        : 12px;
}
</style>
