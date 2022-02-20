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

export default Vue.extend(
    {
      name: 'App',
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
