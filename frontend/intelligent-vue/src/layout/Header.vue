<template>
    <div>
        <v-app-bar
            color="deep-purple accent-4"
            dense
            dark
        >
        <v-icon class="mr-2">fa-star</v-icon>
        <v-toolbar-title>Intelligent</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>fa-heart</v-icon>
        </v-btn>

        <v-menu
            left
            bottom
        >
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
                <v-icon>fa-home</v-icon>
            </v-btn>
            </template>
        </v-menu>
        </v-app-bar>
    </div>
</template>
<script>
export default {
    name: 'header-layout',
    props: [],

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
