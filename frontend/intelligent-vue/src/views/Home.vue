<template>
  <div>
    <p> home </p>
    <p> {{ compSearchResultList }} </p>
  </div>
</template>

<script>

export default {
  name: 'Home',
    props: [],

    components: {
    },

    mounted() {

    },

    computed: {
      compSearchResultList() {
        return this.$store.getters['view/search/getSearchResultList'];
      },
    },

    data() {
        return {

        };
    },

    methods: {
    },
};
</script>
