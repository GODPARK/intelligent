<template>
    <div>
        <v-container>
            <search-comp class="mb-1 mt-1"></search-comp>
            <v-btn
                small
                class="mr-1 ml-1 mb-1 mt-1"
                v-for="node in compSearchResultList" :key="node._id"
                @click="clickSearchResult(node)"
            >
                <v-chip
                    class="mr-1"
                    x-small
                >
                    {{ node.category }}
                </v-chip>
                <strong>{{ node.name }}</strong>
            </v-btn>
        </v-container>
    </div>
</template>
<script>
import SearchComp from '../components/SearchComp.vue';

export default {
    name: 'search-view',
    props: [],

    components: {
        SearchComp,
    },

    mounted() {
        this.searchCall();
    },

    computed: {
        compSearchResultList() {
            return this.$store.getters['view/search/getSearchResultList'];
        },
        darkMode() {
            return this.$store.getters.getDarkMode;
        },
        notDarkMode() {
            return !this.$store.getters.getDarkMode;
        },
    },

    data() {
        return {

        };
    },

    methods: {
        searchCall() {
            if (this.$route.query.value) {
                const param = this.$route.query.value;
                this.$store.dispatch('api/search/getSearchKeywordApi', param).then(
                    (response) => {
                        console.log(response);
                        this.$store.commit('view/search/setSearchResultList', response);
                    },
                );
            }
        },

        clickSearchResult(value) {
            this.$store.commit('view/node/addSelectedNodeList', value);
        },
    },

};
</script>
