<template>
    <div v-if="compSearchResultList.length > 0">
        <v-list>
            <v-list-item>
                <v-btn small text
                    @click="clickClearSearchResult()"
                >
                    clear
                </v-btn>
            </v-list-item>
            <v-list-item
                v-for="node in compSearchResultList" :key="node._id"
            >
                <v-btn
                    small
                    class="mr-1 ml-1 mb-1 mt-1"
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
            </v-list-item>
        </v-list>
    </div>
</template>
<script>
export default {
    name: 'search-result-view',
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
        clickSearchResult(value) {
            this.$store.commit('view/node/addSelectedNodeList', value);
        },
        clickClearSearchResult() {
            this.$store.commit('view/search/clearSearchResultList');
        },
    },

};
</script>
