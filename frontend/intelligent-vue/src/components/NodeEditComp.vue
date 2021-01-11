<template>
    <div>
        <v-dialog
            v-model="showNodeEditDialog"
            max-width="500px"
            persistent
        >
            <v-card>
                <v-toolbar
                    :color="colorSelected"
                >
                    <v-toolbar-title>
                        <strong> Edit Node </strong>
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content class="mr-2">
                                <v-list-item-title>
                                    Color.
                                </v-list-item-title>
                                <v-select
                                    v-model="colorSelected"
                                    :items="colorList"
                                    :color="colorSelected"
                                    outlined
                                    dense
                                >
                                </v-select>
                            </v-list-item-content>
                            <v-list-item-content class="ml-2">
                                <v-list-item-title>
                                    Name.
                                </v-list-item-title>
                                <v-text-field
                                    v-model="editNodeObject.name"
                                    dense
                                    outlined
                                >
                                </v-text-field>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content class="mr-2">
                                <v-list-item-title>
                                    Category.
                                </v-list-item-title>
                                <v-text-field
                                    v-model="editNodeObject.category"
                                    dense
                                    outlined
                                >
                                </v-text-field>
                            </v-list-item-content>
                            <v-list-item-content class="ml-2">
                                <v-list-item-title>
                                    Detail.
                                </v-list-item-title>
                                <v-text-field
                                    v-model="editNodeObject.detail"
                                    dense
                                    outlined
                                >
                                </v-text-field>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    Info.
                                </v-list-item-title>
                                <v-textarea
                                    v-model="editNodeObject.info"
                                    clearable
                                    auto-grow
                                    rows="3"
                                    outlined
                                >
                                </v-textarea>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card-text>
                <v-card-actions>
                    <v-spacer>
                    </v-spacer>
                    <v-btn @click="closeShowNodeCreateDialog()">
                        close
                    </v-btn>
                    <v-btn @click="saveEditNode()">
                        save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import NodeColor from './NodeColor';

export default {
    name: 'node-edit-comp',
    props: ['node'],

    components: {

    },

    mounted() {

    },

    computed: {},

    data() {
        return {
            showNodeEditDialog: false,
            editNodeObject: {
                name: '',
                category: '',
                detail: '',
                info: '',
                color: '',
            },
            colorSelected: 'grey lighten-1',
            colorList: NodeColor,
        };
    },

    methods: {
        openShowNodeCreateDialog() {
            this.editNodeObject.name = this.node.name;
            this.editNodeObject.category = this.node.category;
            this.editNodeObject.info = this.node.info;
            this.editNodeObject.detail = this.node.detail;
            this.editNodeObject.color = this.node.color;
            this.colorSelected = this.node.color;
            this.showNodeEditDialog = true;
        },
        closeShowNodeCreateDialog() {
            this.showNodeEditDialog = false;
        },
        saveEditNode() {
            this.editNodeObject._id = this.node._id;
            if (this.editNodeObject._id) {
                this.$store.dispatch('api/node/patchNodeBodyApi', this.editNodeObject).then(
                    (response) => {
                        this.$store.commit('view/node/updateSelectedNode', response);
                        this.closeShowNodeCreateDialog();
                    },
                );
            }
        },
    },

};
</script>
