<template>
  <div>
    <!--system bar/status bar-->
    <system-bar v-if = "!isMobile()"/>

    <!--header and top tabs-->
    <app-bar-home/>

    <!--router view-->
    <transition name = "scale" mode = "out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script lang = "ts">
import Vue from "vue";
import AppBarHome from "@/components/appbar/Home.vue";
import SystemBar from "@/components/SystemBar.vue";

export default Vue.extend(
    {
      name      : 'ChatHome',
      components: {SystemBar, AppBarHome},

      methods: {
        // detects if app is running in physical phone.
        // hide system bar in physical phone.
        isMobile() {
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
          }

          return false;
        }
      }
    });
</script>
