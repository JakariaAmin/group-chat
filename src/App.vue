<template>
  <v-app>
    <v-main>

      <!--router view-->
      <transition name = "scale" mode = "out-in">
        <router-view></router-view>
      </transition>

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
  padding   : 4px 0;
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
.scale-enter-active,
.scale-leave-active {
  transition : all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity   : 0;
  transform : scale(0.9);
}
</style>
