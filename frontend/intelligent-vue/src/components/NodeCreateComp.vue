<template>
    <div>
        <v-btn
            :dark="darkMode"
            @click="openShowNodeCreateDialog()"
        >
            NEW
        </v-btn>
        <v-dialog
            v-model="showNodeCreateDialog"
            max-width="500px"
            persistent
        >
            <v-card>
                <v-toolbar
                    :color="colorSelected"
                >
                    <v-toolbar-title>
                        <strong> New Node Create </strong>
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
                                    v-model="newNodeObject.name"
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
                                    v-model="newNodeObject.category"
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
                                    v-model="newNodeObject.detail"
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
                                    v-model="newNodeObject.info"
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
                    <v-btn @click="saveNewNode()">
                        save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import NodeColor from './NodeColor';

export default {
    name: 'node-create-comp',
    props: [],

    components: {

    },

    mounted() {

    },

    computed: {
        darkMode() {
            return this.$store.getters.getDarkMode;
        },
    },

    data() {
        return {
            showNodeCreateDialog: false,
            newNodeObject: {
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
            this.showNodeCreateDialog = true;
        },
        closeShowNodeCreateDialog() {
            this.showNodeCreateDialog = false;
            this.newNodeObject = {
                name: '',
                category: '',
                detail: '',
                info: '',
                color: '',
            };
        },
        saveNewNode() {
            this.newNodeObject.color = this.colorSelected;
            this.$store.dispatch('api/node/postNodeBodyApi', this.newNodeObject).then(
                (response) => {
                    this.$store.commit('view/node/addSelectedNodeList', response);
                    this.closeShowNodeCreateDialog();
                },
            );
        },
    },

};
</script>
