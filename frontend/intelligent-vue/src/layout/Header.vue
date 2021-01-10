<template>
    <div>
        <v-toolbar
            dense
            elevation="4"
            outlined
            :dark="darkMode"
        >
            <v-toolbar-title>
                <v-icon class="mr-2" >fa-book</v-icon>
                Intelligent
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                @click="changeDarkMode()"
                small
            >
                dark
            </v-btn>
        </v-toolbar>
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

    computed: {
        darkMode() {
            return this.$store.getters.getDarkMode;
        },
    },

    data() {
        return {
            showSearchBar: false,
        };
    },

    methods: {
        changeDarkMode() {
            this.$store.commit('changeDarkMode');
        },
    },

};
</script>
