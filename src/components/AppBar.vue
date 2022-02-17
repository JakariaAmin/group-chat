<template>
  <div>
    <v-app-bar
        color = "primary"
        class = "app-bar flex-grow-0"
        dark
    >
      <!--WhatsApp title at top left corner-->
      <div class = "title-whatsapp">WhatsApp</div>

      <v-spacer></v-spacer>

      <!--search icon at top right corner-->
      <v-btn icon class = "icon-first" @click = "snackbar = true">
        <v-icon>$vuetify.icons.search</v-icon>
      </v-btn>

      <!--settings icon at top right corner and it's menu-->
      <v-menu
          bottom
          left
          transition = "slide-y-transition"
      >
        <template v-slot:activator = "{ on, attrs }">
          <!--settings btn with icon-->
          <v-btn
              dark
              icon
              v-bind = "attrs"
              v-on = "on"
          >
            <v-icon>$vuetify.icons.settings</v-icon>
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

      <!--tabs section-->
      <template v-slot:extension>
        <!--camera btn icon at left top corner-->
        <v-btn icon @click = "snackbar = true">
          <v-icon class = "tab-icon">$vuetify.icons.camera</v-icon>
        </v-btn>

        <!--tabs: chats, status, calls-->
        <v-tabs
            grow
            slider-size = "3"
            class = "top-tabs"
        >
          <v-tab to = "/chats">
            {{ $vuetify.lang.t('$vuetify.CHATS') }}

            <!--unread message count-->
            <div class = "tab-chip">6</div>
          </v-tab>

          <v-tab to = "/status">
            {{ $vuetify.lang.t('$vuetify.STATUS') }}

            <!--dot-->
            <span class = "dot"/>
          </v-tab>

          <v-tab to = "/calls">
            {{ $vuetify.lang.t('$vuetify.CALLS') }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

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
      name: 'AppBar',

      data: () => ({
        snackbar: false,
        settings: [
          {title: 'NewGroup'},
          {title: 'NewBroadcast'},
          {title: 'LinkedDevices'},
          {title: 'StarredMessages'},
          {title: 'Settings'},
        ],
      }),
    })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = "scss">
.app-bar {
  box-shadow : 0px 2px 10px 0 rgba(0, 0, 0, 0.10) !important;

  margin-top : 30px !important;

  .v-icon {
    width : 20px !important;
  }
}

.title-whatsapp {
  font-weight : map-get($roboto-weights, medium);
  font-size   : 21px;
}

.icon-first {
  margin-right : 8px;
}

.v-menu__content {
  border-radius : 2px;
  box-shadow    : rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
}

.menu-list {
  padding : 4px 20px 4px 2px;
  right   : 4px;
}

.tab-icon {
  width : 20px !important;
  color : rgba(255, 255, 255, 0.75) !important;
}

.top-tabs {
  .v-tab {
    font-weight    : map-get($roboto-weights, bold);
    font-size      : 15px;
    letter-spacing : 0.3px;
  }
}

.tab-chip {
  display          : flex;
  flex-direction   : column;
  justify-content  : center;
  align-items      : center;

  margin-left      : 6px;

  height           : 20px;
  border-radius    : 10px;
  padding-left     : 6px;
  padding-right    : 6px;
  padding-bottom   : 0.5px;

  background-color : white;
  color            : $primary;

  font-family      : $roboto;
  font-weight      : map-get($roboto-weights, bold);
  font-size        : 13px;
}

.dot {
  margin-left      : 6px;

  height           : 8px;
  width            : 8px;
  background-color : rgba(255, 255, 255, 0.60);
  border-radius    : 50%;
  display          : inline-block;
}
</style>


