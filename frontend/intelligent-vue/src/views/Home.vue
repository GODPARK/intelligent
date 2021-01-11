<template>
  <div>
    <v-toolbar
      dense
      floating
    >
      <node-create-comp></node-create-comp>
      <search-comp @search="openSearchResultView"></search-comp>
    </v-toolbar>
    <node-view></node-view>
    <v-navigation-drawer
      v-model="searchResultView"
      right
      absolute
      temporary
    >
      <search-result-view></search-result-view>
    </v-navigation-drawer>
  </div>
</template>

<script>
import NodeView from './NodeView.vue';
import SearchResultView from './SearchResultView.vue';
import SearchComp from '../components/SearchComp.vue';
import NodeCreateComp from '../components/NodeCreateComp.vue';

export default {
  name: 'Home',
    props: [],

    components: {
      NodeView,
      SearchResultView,
      SearchComp,
      NodeCreateComp,
    },

    mounted() {

    },

    watch: {
      compShowSearchResultView(last) {
        console.log(last);
        this.searchResultView = last;
      },
    },

    computed: {
    },

    data() {
        return {
          searchResultView: false,
        };
    },

    methods: {
      openSearchResultView() {
        this.searchResultView = true;
      },
    },
};
</script>
