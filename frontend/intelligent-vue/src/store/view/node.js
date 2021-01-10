const Node = {
    namespaced: true,
    state: {
        viewNodeId: 0,
        selectedNodeList: [],
        selectedNodeindexMap: new Map(),
    },
    getters: {
        getSelectedNodeList(state) {
            return state.selectedNodeList;
        },
        lenSelectedNodeList(state) {
            return state.selectedNodeList.length;
        },
    },
    mutations: {
        setSelectedNodeList(state, list) {
            state.selectedNodeList = list;
        },
        addSelectedNodeList(state, value) {
            console.log(state.selectedNodeList);
            console.log(state.selectedNodeindexMap);
            /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
            if (!state.selectedNodeindexMap.has(value._id)) {
                const saveData = value;
                saveData.viewId = state.viewNodeId;
                state.selectedNodeList.push(saveData);
                state.selectedNodeindexMap.set(saveData._id, state.viewNodeId);
                state.viewNodeId += 1;
            }
        },
        clearSelectedNodeList(state) {
            state.viewNodeId = 0;
            state.selectedNodeList = [];
            state.selectedNodeindexMap.clear();
        },
        closeNodeView(state, viewId) {
            const deleteIdx = state.selectedNodeList.findIndex(
                (x) => x.viewId === viewId,
            );
            state.selectedNodeindexMap.delete(
                state.selectedNodeList[deleteIdx]._id,
            );
            state.selectedNodeList.splice(deleteIdx, 1);
        },
    },
    actions: {
    },
    modules: {
    },
};

export default Node;
