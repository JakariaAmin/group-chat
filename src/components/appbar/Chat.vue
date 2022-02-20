<template>
  <div>
    <v-app-bar
        color = "primary"
        class = "app-bar flex-grow-0"
        dark
        fixed
    >
      <!--left section consists of back button user avatar and photo-->
      <div class = "row align-center" @click = "$router.back()">
        <!--back button-->
        <my-image src = "ic_back.png" class = "img-back"/>

        <!--user photo-->
        <v-avatar class = "user-avatar">
          <v-img :src = "$store.state.chat.avatar" alt = "avatar"></v-img>
        </v-avatar>

        <!--user name-->
        <div class = "user-name">{{ $store.state.chat.name }}</div>
      </div>

      <v-spacer></v-spacer>

      <!--search icon at top right corner-->
      <v-btn icon @click = "snackbar = true">
        <my-image src = "ic_video.png"/>
      </v-btn>

      <!--search icon at top right corner-->
      <v-btn icon @click = "snackbar = true">
        <my-image src = "call.png" classes = "img-call"/>
      </v-btn>

      <!--settings icon at top right corner and it's menu-->
      <v-menu
          bottom
          left
          transition = "slide-y-transition"
      >
        <template v-slot:activator = "{ on, attrs }">
          <!--settings btn with icon-->
          <v-btn icon v-bind = "attrs" v-on = "on">
            <my-image src = "ic_more.png" classes = "img-more"/>
          </v-btn>
        </template>

        <!--list of menu items-->
        <v-list class = "menu-list">
          <v-list-item
              v-for = "(item, i) in settings"
              :key = "i"
              @click = "snackbar = true"
          >
            <v-list-item-title>{{ $vuetify.lang.t('$vuetify.' + item.title) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>

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
import MyImage from "@/components/MyImage.vue";

export default Vue.extend(
    {
      name      : 'AppBarChat',
      components: {MyImage},

      data: () => ({
        snackbar: false,
        settings: [
          {title: 'ViewContact'},
          {title: 'MediaLinksAndDocs'},
          {title: 'Search'},
          {title: 'MuteNotifications'},
          {title: 'Wallpaper'},
          {title: 'More'},
        ],
      }),
    })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = "scss">
.app-bar .v-btn .v-image, .img-back {
  height     : 26px;
  width      : 26px;
  max-width  : 26px;

  object-fit : contain;

  &.img-call {
    height    : 24px;
    width     : 24px;
    max-width : 24px;
  }

  &.img-more {
    height    : 26px;
    width     : 26px;
    max-width : 26px;
  }
}

.user-avatar {
  height       : 36px !important;
  width        : 36px !important;
  min-width    : 36px !important;

  margin-right : 8px;
}

.user-name {
  font-weight : map-get($roboto-weights, medium);
  font-size   : 20px;
}

.v-menu__content {
  border-radius : 2px;
  box-shadow    : rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
}
</style>


