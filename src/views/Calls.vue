<template>
  <div class = "calls-screen">
    <div class = "title">Calls screen not ready yet</div>
  </div>
</template>

<script lang = "ts">
import Vue from "vue";

export default Vue.extend(
    {
      name: 'Calls',

      components: {},
    })
</script>

<style scoped lang = "scss">
.calls-screen {
  height           : calc(100vh - 104px); // 104 = top header height.
  background-color : #F3EEE8;
}

.title {
  height          : 100%;
  display         : flex;
  flex-display    : block;
  flex-direction  : column;
  justify-content : center;
  align-items     : center;

  font-size       : 16px;
}
</style>
