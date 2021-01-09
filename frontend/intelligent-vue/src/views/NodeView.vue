<template>
    <div>
        <v-container>
            <v-row>
                <v-col
                    md="6" sm="6" xs="12" lg="4"
                    v-for="node in compSelectedNodeList" :key="node._id"
                >
                    <node-comp :node="node"></node-comp>
                </v-col>
            </v-row>
        </v-container>
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
    },

    data() {
        return {

        };
    },

    methods: {
    },

};
</script>
