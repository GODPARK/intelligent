<template>
  <v-app>
    <header-layout></header-layout>
    <v-main class="mt-3 ml-3 mr-3">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import HeaderLayout from './layout/Header.vue';

export default {
  name: 'App',

  components: {
    HeaderLayout,
  },

  data: () => ({
    //
  }),
};
</script>
