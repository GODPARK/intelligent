<template>
    <div>
        <v-card
            dense
            elevation="2"
            color="teal lighten-3"
            outlined
            :dark="darkMode"
        >
            <v-card-title>
                <div  @click="goHome()">
                    <v-icon class="mr-2" >fa-book</v-icon>
                    Intelligent
                </div>
                <v-spacer></v-spacer>
                <v-btn text small @click="goNodeCreate()">
                    <v-icon small class="mr-1">fa-plus</v-icon>
                    NEW
                </v-btn>
            </v-card-title>
            <search-bar></search-bar>
        </v-card>
    </div>
</template>
<script>
import SearchBar from '../components/Search.vue';

export default {
    name: 'header-layout',
    props: [],

    components: {
        SearchBar,
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

        };
    },

    methods: {
        goHome() {
            this.$router.replace('/');
        },
        goNodeCreate() {
            this.$router.replace('/node/create');
        },
    },

};
</script>
