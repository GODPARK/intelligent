const Node = {
    namespaced: true,
    state: {
        selectedNodeList: [],
    },
    getters: {
        getSelectedNodeList(state) {
            return state.selectedNodeList;
        },
    },
    mutations: {
        setSelectedNodeList(state, list) {
            state.selectedNodeList = list;
        },
        addSelectedNodeList(state, value) {
            state.selectedNodeList.push(value);
        },
    },
    actions: {
    },
    modules: {
    },
};

export default Node;
