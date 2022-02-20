<template>
  <v-img
      :src = "fullPath || require(`@/assets/images/${ratio}/${src}`)"
      :srcset = "fullPath || `
      ${require('@/assets/images/1x/'+ src)},
      ${require('@/assets/images/2x/'+ src)} 2x,
      ${require('@/assets/images/3x/'+ src)} 3x,
      ${require('@/assets/images/4x/'+ src)} 4x
      `"
      :alt = "alt"
      :fit = "fit"
      :class = "classes"
  >
  </v-img>
</template>

<script lang = "ts">
import Vue from "vue";

export default Vue.extend(
    {
      name: 'MyImage',

      props: {
        // If full path is provided then skip srcset:
        fullPath: {
          type   : String,
          default: null,
        },

        // If using local images from assets dir:
        src: {
          type: String,
        },
        // Default image pixel ratio:
        ratio: {
          type   : String,
          default: '2x',
        },

        alt: {
          type: String,
        },

        fit: {
          type   : String,
          default: 'contain', // 'cover', 'fill', 'contain', 'none', 'scale-down'
        },

        // Clases:
        classes: {
          type: String,
        },
      },
    });
</script>

<!--
    There are 4 folders in public images path: 1x, 2x, 3x, 4x.
    And srcset is used here with responsive image src.
-->

