<template>
  <div>
    <p> home </p>
    <search-bar></search-bar>
  </div>
</template>

<script>
import SearchBar from '../components/Search.vue';

export default {
  name: 'Home',
    props: [],

    components: {
      SearchBar,
    },

    mounted() {

    },

    computed: {},

    data() {
        return {

        };
    },

    methods: {
    },
};
</script>
