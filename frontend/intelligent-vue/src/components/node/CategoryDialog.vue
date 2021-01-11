<template>
    <div>
        <v-dialog
            v-model="showOverNode"
            max-width="500px"
        >
            <v-card>
                <v-card-title>
                    Search Category:
                    <v-btn class="ml-1"> {{searchCategory}} </v-btn>
                </v-card-title>
                <v-data-table
                    dense
                    :headers="searchCategoryHeader"
                    :items="searchCategoryNodeList"
                    item-key="_id"
                    class="elevation-1 mr-2 ml-2 mt-2 mb-2"
                >
                    <template v-slot:[`item.state`]="{ item }">
                        <v-btn x-small @click="addNodeInView(item)"> show </v-btn>
                    </template>
                </v-data-table>
                <v-card-actions>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    name: 'node-category-dialog',
    props: ['node'],

    components: {

    },

    mounted() {

    },

    computed: {},

    data() {
        return {
            showOverNode: false,
            searchCategory: '',
            searchCategoryNodeList: [],
            searchCategoryHeader: [
                { text: 'show', value: 'state' },
                {
                    text: 'node',
                    align: 'start',
                    sortable: true,
                    value: 'name',
                },
                { text: 'category', value: 'category' },
                { text: 'detail', value: 'detail' },
            ],

        };
    },

    methods: {
        addNodeInView(node) {
            this.$store.commit('view/node/addSelectedNodeList', node);
        },
        openCategoryDialog() {
            this.searchCategory = '';
            this.searchCategoryNodeList = [];
            const { category } = this.node;
            if (category) {
                this.$store.dispatch('api/search/getSearchCategoryApi', category).then(
                    (response) => {
                        this.searchCategoryNodeList = response;
                        this.searchCategory = category;
                        this.showOverNode = true;
                    },
                );
            }
        },
        closeCategoryDialog() {
            this.showOverNode = false;
        },
    },

};
</script>
