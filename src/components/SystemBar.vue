<template>
  <!--system bar/status bar-->
  <v-system-bar
      height = "30"
      color = "primary"
      dark
  >
    <v-spacer></v-spacer>

    <span>{{ time }}</span>
  </v-system-bar>
</template>

<script lang = "ts">
import Vue from "vue";

export default Vue.extend(
    {
      name: 'SystemBar',

      data: () => ({
        time    : '',
        interval: 0,
      }),

      mounted() {
        // update status bar time on every min.
        this.interval = setInterval(() => {
          this.updateClock()
        }, 1000);
      },
      beforeDestroy() {
        // clear update current time interval.
        clearInterval(this.interval);
      },

      methods: {
        // updateClock method updates time on every min.
        updateClock(): void {
          const date = new Date();

          let hours                    = date.getHours();
          let minutes: number | string = date.getMinutes();
          const amOrPm                 = hours >= 12 ? "PM" : "AM";
          hours                        = hours % 12;
          hours                        = hours ? hours : 12; // hour 0 should show as 12.
          minutes                      = minutes < 10 ? '0' + minutes : minutes; // adds 0 for 1 char min.
          this.time                    = `${hours}:${minutes} ${amOrPm}`;
        }
      }
    })
</script>


