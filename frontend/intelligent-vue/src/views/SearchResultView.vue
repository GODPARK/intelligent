<template>
    <div>
        <v-dialog
            v-model="showSearchResult"
            scrollable
            max-width="550"
        >
            <v-card v-if="compSearchResultList.length === 0">
                <v-alert type="error">
                    Not Found
                </v-alert>
                <v-card-text>
                    Please Check your Search word
                </v-card-text>
            </v-card>
            <v-list v-if="compSearchResultList.length > 0">
                <v-list-item>
                    <h4> Search Result </h4>
                </v-list-item>
                <v-list-item
                    v-for="node in compSearchResultList" :key="node._id"
                >
                    <v-btn
                        small
                        block
                        class="mr-1 ml-1 mb-1 mt-1"
                        color="blue-grey darken-2"
                        @click="clickSearchResult(node)"
                    >
                        <v-chip
                            class="mr-1"
                            x-small
                            :color="node.color"
                        >
                            {{ node.category }}
                        </v-chip>
                        <strong style="color:white">{{ node.name }}</strong>
                    </v-btn>
                </v-list-item>
            </v-list>
        </v-dialog>
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
            showSearchResult: false,
        };
    },

    methods: {
        clickSearchResult(value) {
            this.$store.commit('view/node/addSelectedNodeList', value);
        },
        clickClearSearchResult() {
            this.$store.commit('view/search/clearSearchResultList');
        },
        openSearchResultDialog() {
            this.showSearchResult = true;
        },
        closeSearchResultDialog() {
            this.showSearchResult = false;
        },
    },

};
</script>
