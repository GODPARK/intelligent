<template>
    <div>
        <v-card v-if="node !== undefined"
            height="340px"
            outlined
            :elevation="customElevation"
        >
            <v-toolbar
                flat
                :color="compNodeColor"
                dense
            >
                <v-toolbar-title>
                    <strong>{{ node.name }}</strong>
                </v-toolbar-title>
                <v-spacer>
                </v-spacer>
                <v-btn text small
                    @click="closeNode(node.viewId)"
                >
                    <v-icon small>fa-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card
                height="250px"
                tile
                elevation="0"
                style="overflow:auto"
            >
                <v-list dense>
                    <v-list-item>
                        <v-list-item-content class="mr-1 ml-1 mb-1">
                            <v-list-item-title>
                                Category
                            </v-list-item-title>
                            <v-btn
                                color="blue-grey lighten-5"
                                x-small
                                @click="openCategoryDialog(node.category)"
                            >
                                {{ node.category }}
                            </v-btn>
                        </v-list-item-content>
                        <v-list-item-content class="mr-1 ml-1 mb-1">
                        <v-list-item-title>
                            Detail
                        </v-list-item-title>
                            <v-btn x-small
                                color="blue-grey lighten-5"
                            >
                                {{node.detail}}
                            </v-btn>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content class="mr-1 ml-1 mb-1">
                            <v-list-item-title>
                                Link
                                <v-btn x-small text @click="openLinkDialog()">
                                    <v-icon x-small>fa-link</v-icon>
                                </v-btn>
                            </v-list-item-title>
                            <div>
                                <v-btn
                                    x-small
                                    v-for="item in node.link" :key="item.link_id"
                                    :color="item.link_color"
                                    class="mr-1 ml-1 mb-1"
                                >
                                    <strong>{{ item.link_name }}</strong>
                                </v-btn>
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content class="mr-1 ml-1 mb-1">
                            <v-list-item-title>
                                Info
                            </v-list-item-title>
                            <div class="text-body-2">
                                {{ node.info }}
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
            <v-card-actions>
                <v-rating
                    class="ml-2"
                    background-color="grey"
                    color="yellow accent-4"
                    dense
                    hover
                    size="15"
                ></v-rating>
                <v-spacer></v-spacer>
                <v-btn text small>
                    JSON
                </v-btn>
                <v-btn text x-small>
                    <v-icon small>fa-refresh</v-icon>
                </v-btn>
                <v-btn text x-small>
                    <v-icon small>fa-edit</v-icon>
                </v-btn>
                <v-btn text x-small>
                    <v-icon small>fa-trash</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
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
        <v-dialog
         v-model="showLinkDialog"
         max-width="500px"
        >
            <v-card>
                <v-toolbar dense>
                    <v-toolbar-title>
                        <strong> {{ node.name }} </strong>
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field
                        v-model="searchLinkText"
                        placeholder="Search Node"
                        @keydown.enter="searchCall()"
                    >
                    </v-text-field>
                    <v-data-table
                        dense
                        :headers="searchLinkHeader"
                        :items="searchLinkNodeList"
                        item-key="_id"
                    >
                        <template v-slot:[`item.state`]="{ item }">
                            <v-btn x-small v-if="item.alink === 0">
                                <v-icon x-small class="mr-1">
                                    fa-link
                                </v-icon>
                                link
                            </v-btn>
                            <v-btn x-small v-if="item.alink === 1"
                                color="teal lighten-4"
                            >
                                <v-icon x-small class="mr-1">
                                    fa-unlink
                                </v-icon>
                                unlink
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    name: 'node-comp',
    props: ['node', 'customElevation'],

    components: {

    },

    mounted() {

    },

    computed: {
        compNodeColor() {
            if (this.node.color) {
                return this.node.color;
            }
            return 'grey';
        },
    },

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
            showLinkDialog: false,
            searchLinkText: '',
            searchLinkNodeList: [],
            searchLinkHeader: [
                { text: 'link', value: 'state' },
                {
                    text: 'node',
                    value: 'name',
                    align: 'start',
                    sortable: true,
                },
                {
                    text: 'category',
                    value: 'category',
                    align: 'start',
                    sortable: true,
                },
            ],
        };
    },

    methods: {
        closeNode(viewId) {
            this.$store.commit('view/node/closeNodeView', viewId);
        },
        openCategoryDialog(category) {
            this.searchCategory = '';
            this.searchCategoryNodeList = [];
            this.$store.dispatch('api/search/getSearchCategoryApi', category).then(
                (response) => {
                    this.searchCategoryNodeList = response;
                    this.searchCategory = category;
                    this.showOverNode = true;
                },
            );
        },
        closeCategoryDialog() {
            this.showOverNode = false;
        },
        openLinkDialog() {
            this.searchLinkNodeList = [];
            this.searchLinkText = '';
            this.node.link.forEach((element) => {
                const alreadyNode = {
                    id: element.link_id,
                    name: element.link_name,
                    category: element.link_category,
                    state: 1,
                    alink: 1,
                };
                this.searchLinkNodeList.push(alreadyNode);
            });
            this.showLinkDialog = true;
        },
        closeLinkDialog() {
            this.showLinkDialog = false;
        },
        addNodeInView(node) {
            this.$store.commit('view/node/addSelectedNodeList', node);
        },
        searchCall() {
            if (this.searchLinkText) {
                this.$store.dispatch('api/search/getSearchKeywordApi', this.searchLinkText).then(
                    (response) => {
                        response.forEach((element) => {
                            const linkTargetNode = element;
                            linkTargetNode.alink = 0;
                            this.searchLinkNodeList.push(linkTargetNode);
                        });
                    },
                );
            }
        },
    },

};
</script>
