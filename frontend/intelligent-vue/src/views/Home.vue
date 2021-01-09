<template>
  <div>
    <v-card class="mr-1 mb-3 mt-3 ml-1" outlined shaped elevation="3">
      <v-card-title>
        Search
      </v-card-title>
      <search-view></search-view>
    </v-card>
    <v-card class="mr-1 mb-3 mt-3 ml-1" outlined shaped elevation="3">
      <v-card-actions>
        <v-btn text> func1 </v-btn>
        <v-btn text> func2 </v-btn>
        <v-btn text> func3 </v-btn>
        <v-btn text> func4 </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <node-view></node-view>
    </v-card>
  </div>
</template>

<script>
import SearchView from './SearchView.vue';
import NodeView from './NodeView.vue';

export default {
  name: 'Home',
    props: [],

    components: {
      SearchView,
      NodeView,
    },

    mounted() {

    },

    computed: {
    },

    data() {
        return {

        };
    },

    methods: {
    },
};
</script>
