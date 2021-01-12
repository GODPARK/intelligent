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
    <search-result-view ref="result"></search-result-view>
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

    computed: {
    },

    data() {
        return {
        };
    },

    methods: {
      openSearchResultView() {
        this.$refs.result.openSearchResultDialog();
      },
    },
};
</script>
