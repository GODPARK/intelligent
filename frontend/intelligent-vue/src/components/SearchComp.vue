<template>
    <v-text-field
        class="mx-4"
        v-model="searchText"
        placeholder="Search"
        solo
        dense
        clearable
        single-line
        append-icon="fa-search"
        @keydown.enter="searchCall()"
    ></v-text-field>
</template>
<script>
export default {
    name: 'search-comp',
    props: [],

    components: {

    },

    mounted() {

    },

    computed: {
        darkMode() {
            return !this.$store.getters.getDarkMode;
        },
    },

    data() {
        return {
            searchText: '',
        };
    },

    methods: {
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
