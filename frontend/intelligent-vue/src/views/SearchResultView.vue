<template>
    <div >
        <v-alert type="error" v-if="compSearchResultList.length === 0">
            Not Found
        </v-alert>
        <v-list v-if="compSearchResultList.length > 0">
            <v-list-item>
                <v-btn small text
                    block
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
                    block
                    class="mr-1 ml-1 mb-1 mt-1"
                    color="blue-grey darken-3"
                    @click="clickSearchResult(node)"
                >
                    <v-chip
                        class="mr-1"
                        x-small
                    >
                        {{ node.category }}
                    </v-chip>
                    <strong style="color:white">{{ node.name }}</strong>
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
            const list = this.$store.getters['view/search/getSearchResultList'];
            if (list) {
                return list;
            }
            return [];
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
