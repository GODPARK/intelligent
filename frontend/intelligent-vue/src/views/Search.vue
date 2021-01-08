<template>
    <div>
        <p> search </p>
        <p> {{ compSearchResultList }} </p>
    </div>
</template>
<script>
export default {
    name: 'sample',
    props: [],

    components: {
    },

    mounted() {
        this.searchCall();
    },

    computed: {
        compSearchResultList() {
            return this.$store.getters['view/search/getSearchResultList'];
        },
    },

    data() {
        return {

        };
    },

    methods: {
        searchCall() {
            if (this.$route.query.value) {
                const param = this.$route.query.value;
                this.$store.dispatch('api/search/getSearchKeywordApi', param).then(
                    (response) => {
                        console.log(response);
                        this.$store.commit('view/search/setSearchResultList', response);
                    },
                );
            }
        },
    },

};
</script>
