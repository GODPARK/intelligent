const Search = {
    namespaced: true,
    state: {
        searchResultList: [],
        showSearchResultView: false,
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
        clearSearchResultList(state) {
            state.searchResultList = [];
        },
    },
    actions: {},
    modules: {},
};

export default Search;
