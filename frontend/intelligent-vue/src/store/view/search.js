const Search = {
    namespaced: true,
    state: {
        searchResultList: [],
    },
    getters: {
        getSearchResultList(state) {
            return state.searchResultList;
        },
    },
    mutations: {
        setSearchResultList(state, list) {
            state.searchResultList = list;
        },
    },
    actions: {},
    modules: {},
};

export default Search;
