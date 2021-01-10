<template>
    <div>
        <v-text-field
            class="mx-4 mt-3"
            v-model="searchText"
            placeholder="Search"
            dense
            clearable
            single-line
            hid-details
            append-icon="fa-search"
            @keydown.enter="searchCall()"
        ></v-text-field>
    </div>
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
                        this.$store.commit('view/search/setSearchResultList', response);
                        this.$emit('search');
                    },
                );
            }
        },
    },

};
</script>
