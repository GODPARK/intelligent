<template>
    <v-card v-if="node !== undefined"
        height="250px"
        outlined
        elevation="2"
    >
        <v-toolbar
            flat
            color="info"
            dense
        >
            <v-toolbar-title>
                {{ node.name }}
            </v-toolbar-title>
            <v-spacer>
            </v-spacer>
            <v-btn text small>
                <v-icon small>fa-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-tabs vertical
            color="info"
        >
            <v-tab>
                Info
            </v-tab>
            <v-tab>
                Link
            </v-tab>
            <v-tab>
                Audit
            </v-tab>
            <v-tab-item>
                <v-card flat
                    height="200px"
                    style="overflow:auto"
                >
                    <v-card-text>
                        categroy: {{node.category}}
                        <br>
                        detail: {{node.detail}}
                        <br>
                        info: {{node.info}}
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat
                    height="200px"
                    style="overflow:auto"
                >
                    <v-card-text>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat
                    height="200px"
                    style="overflow:auto"
                >
                    <v-card-text>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>
<script>
export default {
    name: 'node-comp',
    props: ['node'],

    components: {

    },

    mounted() {

    },

    computed: {},

    data() {
        return {

        };
    },

    methods: {
    },

};
</script>
