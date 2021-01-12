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
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                    <v-toolbar-title
                        v-bind="attrs"
                        v-on="on"
                    >
                        <strong>{{ node.name }}</strong>
                    </v-toolbar-title>
                    </template>
                    <span>{{ node._id }}</span>
                </v-tooltip>
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
                                <strong>{{ node.category }}</strong>
                            </v-btn>
                        </v-list-item-content>
                        <v-list-item-content class="mr-1 ml-1 mb-1">
                        <v-list-item-title>
                            Detail
                        </v-list-item-title>
                            <v-btn x-small
                                color="blue-grey lighten-5"
                            >
                                <strong>{{node.detail}}</strong>
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
                                    @click="clickLinkNode(item)"
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
                            <div class="text-body-2" style="white-space:pre-line;">
                                {{ node.info }}
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
            <v-card-actions>
                <v-rating
                    v-model="nodeStar"
                    class="ml-2"
                    background-color="grey"
                    color="yellow accent-4"
                    dense
                    hover
                    size="15"
                    @input="changeStar"
                ></v-rating>
                <v-spacer></v-spacer>
                <v-btn text x-small @click="closeOtherNode(node)">
                    <v-icon small>fa-eject</v-icon>
                </v-btn>
                <v-btn text x-small @click="refreshNode(node)">
                    <v-icon small>fa-refresh</v-icon>
                </v-btn>
                <v-btn text x-small @click="openEditDialog()">
                    <v-icon small>fa-edit</v-icon>
                </v-btn>
                <v-btn text x-small @click="deleteNode(node)">
                    <v-icon small>fa-trash</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
        <node-edit-dialog :node="node" ref="edit"></node-edit-dialog>
        <node-category-dialog :node="node" ref="category"></node-category-dialog>
        <node-link-dialog :node="node" ref="link"></node-link-dialog>
    </div>
</template>
<script>
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import NodeLinkDialog from './node/LinkDialog.vue';
import NodeCategoryDialog from './node/CategoryDialog.vue';
import NodeEditDialog from './NodeEditComp.vue';

export default {
    name: 'node-comp',
    props: ['node', 'customElevation'],

    components: {
        NodeLinkDialog,
        NodeCategoryDialog,
        NodeEditDialog,
    },

    mounted() {
        if (this.node.star) {
            this.nodeStar = this.node.star;
        } else {
            this.nodeStar = 0;
        }
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
            nodeStar: 0,
        };
    },

    methods: {
        closeNode(viewId) {
            this.$store.commit('view/node/closeNodeView', viewId);
        },
        openLinkDialog() {
            this.$refs.link.openLinkDialog();
        },
        openCategoryDialog() {
            this.$refs.category.openCategoryDialog();
        },
        openEditDialog() {
            this.$refs.edit.openShowNodeCreateDialog();
        },
        deleteNode(node) {
            // eslint-disable-next-line
            if (confirm(`Are you suer delete Node: ${node.name}`)) {
                const body = {
                    id: node._id,
                };
                this.$store.dispatch('api/node/deleteNodeBodyApi', body).then(
                    () => {
                        this.$store.commit('view/node/closeNodeView', node.viewId);
                    },
                );
            }
        },
        refreshNode(node) {
            this.$store.dispatch('api/node/getNodeParamApi', node._id).then(
                (response) => {
                    this.$store.commit('view/node/updateSelectedNode', response);
                },
            );
        },
        closeOtherNode(node) {
            this.$store.commit('view/node/closeOtherNode', node);
        },
        clickLinkNode(linkNode) {
            this.$store.dispatch('api/node/getNodeParamApi', linkNode.link_id).then(
                (response) => {
                    this.$store.commit('view/node/updateSelectedNode', response);
                },
            );
        },
        changeStar(star) {
            const body = {};
            body.id = this.node._id;
            body.star = star;
            this.$store.dispatch('api/node/patchNodeStarBodyApi', body).then(
                (response) => {
                    this.nodeStar = response.star;
                },
            );
        },
    },

};
</script>
