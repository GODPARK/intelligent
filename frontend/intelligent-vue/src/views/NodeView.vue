<template>
    <div>
        <v-card
            v-if="compNodeListLength > 0"
            class="mr-1 mb-3 mt-3 ml-1" outlined elevation="3"
        >
            <v-card-actions>
                <v-btn text small @click="sortNodeList('viewId')"> INVERSE </v-btn>
                <v-btn text small @click="sortNodeList('name')"> NAME </v-btn>
                <v-btn text small @click="sortNodeList('category')"> CATEGORY </v-btn>
                <v-btn text small @click="sortNodeList('color')"> COLOR </v-btn>
                <v-spacer></v-spacer>
                <v-btn text small @click="clickCloseNodeList()">
                <v-icon small>fa-close</v-icon>
                </v-btn>
            </v-card-actions>
            <v-divider></v-divider>
            <v-container>
                <v-row>
                    <v-col
                        md="6" sm="6" xs="12" lg="4"
                        v-for="node in compSelectedNodeList" :key="node._id"
                    >
                        <v-hover
                            v-slot="{ hover }"
                        >
                            <node-comp
                                :customElevation="hover ? 6 :2"
                                :node="node"
                            ></node-comp>
                        </v-hover>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </div>
</template>
<script>
import NodeComp from '../components/NodeComp.vue';

export default {
    name: 'node-view',
    props: [],

    components: {
        NodeComp,
    },

    mounted() {

    },

    computed: {
        compSelectedNodeList() {
            return this.$store.getters['view/node/getSelectedNodeList'];
        },
        compNodeListLength() {
            return this.$store.getters['view/node/lenSelectedNodeList'];
        },
    },

    data() {
        return {

        };
    },

    methods: {
        clickCloseNodeList() {
            this.$store.commit('view/node/clearSelectedNodeList');
        },
        sortNodeList(type) {
            if (type === 'viewId') {
                this.$store.commit('view/node/sortByViewId');
            } else if (type === 'color') {
                this.$store.commit('view/node/sortByColor');
            } else if (type === 'category') {
                this.$store.commit('view/node/sortByCategory');
            } else if (type === 'name') {
                this.$store.commit('view/node/sortByName');
            }
        },
    },

};
</script>
