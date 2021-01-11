<template>
    <div>
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
                            <v-btn x-small v-if="item.alink === 0"
                                @click="clickLinkButton(item)"
                            >
                                <v-icon x-small class="mr-1">
                                    fa-link
                                </v-icon>
                                link
                            </v-btn>
                            <v-btn x-small v-if="item.alink === 1"
                                color="teal lighten-4"
                                @click="clinkUnLinkButton(item)"
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
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
export default {
    name: 'node-link-dialog',
    props: ['node'],

    components: {

    },

    mounted() {

    },

    computed: {},

    data() {
        return {
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
        openLinkDialog() {
            this.searchLinkNodeList = [];
            this.searchLinkText = '';
            this.node.link.forEach((element) => {
                const alreadyNode = {
                    _id: element.link_id,
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
        searchCall() {
            if (this.searchLinkText) {
                this.$store.dispatch('api/search/getSearchKeywordApi', this.searchLinkText).then(
                    (response) => {
                        response.forEach((element) => {
                            const linkTargetNode = element;
                            linkTargetNode.alink = 0;
                            if (element._id !== this.node._id) {
                                const idx = this.searchLinkNodeList.findIndex(
                                    (x) => x._id === element._id,
                                );
                                if (idx === -1) {
                                    this.searchLinkNodeList.push(linkTargetNode);
                                }
                            }
                        });
                    },
                );
            }
        },
        clickLinkButton(linkNode) {
            const body = {
                sid: this.node._id,
                tid: linkNode._id,
            };
            this.$store.dispatch('api/link/patchLinkApi', body).then(
                (response) => {
                    console.log(response);
                    response.forEach((element) => {
                        this.$store.commit('view/node/updateSelectedNode', element);
                        const idx = this.searchLinkNodeList.findIndex(
                            (x) => x._id === linkNode._id,
                        );
                        if (idx > -1) this.searchLinkNodeList[idx].alink = 1;
                    });
                },
            );
        },
        clinkUnLinkButton(linkNode) {
            const body = {
                sid: this.node._id,
                tid: linkNode._id,
            };
            this.$store.dispatch('api/link/patchUnLinkApi', body).then(
                (response) => {
                    console.log(response);
                    response.forEach((element) => {
                        this.$store.commit('view/node/updateSelectedNode', element);
                        const idx = this.searchLinkNodeList.findIndex(
                            (x) => x._id === linkNode._id,
                        );
                        if (idx > -1) this.searchLinkNodeList[idx].alink = 0;
                    });
                },
            );
        },
    },
};
</script>
