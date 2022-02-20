<template>
  <div class = "status-screen">
    <div class = "title">Status screen not ready yet</div>
  </div>
</template>

<script lang = "ts">
import Vue from "vue";

export default Vue.extend(
    {
      name: 'Status',

      components: {},
    })
</script>

<style scoped lang = "scss">
.status-screen {
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
