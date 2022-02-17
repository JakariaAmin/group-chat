<template>
  <v-app>
    <!--system bar/status bar-->
    <system-bar/>

    <!--top tabs-->
    <app-bar/>

    <!--router view-->
    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script lang = "ts">
import Vue from 'vue';
import AppBar from "@/components/AppBar.vue";
import SystemBar from "@/components/SystemBar.vue";

export default Vue.extend(
    {
      name      : 'App',
      components: {SystemBar, AppBar},
      // data      : () => ({}),
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = "scss">
#app {
  font-family             : $roboto;
  -webkit-font-smoothing  : antialiased;
  -moz-osx-font-smoothing : grayscale;
}
</style>
