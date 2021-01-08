<template>
    <v-text-field
        class="mx-4"
        v-model="searchText"
        solo
        dense
        clearable
        :dark="darkMode"
        single-line
        append-icon="fa-search"
        @keydown.enter="searchCall()"
    ></v-text-field>
</template>
<script>
export default {
    name: 'search-bar',
    props: [],

    components: {

    },

    mounted() {

    },

    computed: {
        darkMode() {
            return this.$store.getters.getDarkMode;
        },
    },

    data() {
        return {
            searchText: '',
        };
    },

    methods: {
        goSearch() {
            this.$router.push({ path: 'search', query: { value: this.searchText } });
        },

        searchCall() {
            if (this.searchText) {
                this.$store.dispatch('api/search/getSearchKeywordApi', this.searchText).then(
                    (response) => {
                        console.log(response);
                        this.$store.commit('view/search/setSearchResultList', response);
                    },
                );
            }
        },
    },

};
</script>
