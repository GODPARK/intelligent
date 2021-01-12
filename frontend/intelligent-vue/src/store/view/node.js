/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
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
            if (!state.selectedNodeindexMap.has(value._id)) {
                const saveData = value;
                saveData.viewId = state.viewNodeId;
                state.selectedNodeList.push(saveData);
                state.selectedNodeindexMap.set(saveData._id, state.viewNodeId);
                state.viewNodeId += 1;
            }
        },
        closeOtherNode(state, node) {
            state.selectedNodeList = [];
            state.selectedNodeindexMap.clear();
            state.viewNodeId = 0;
            const saveData = node;
            saveData.viewId = state.viewNodeId;
            state.selectedNodeList.push(saveData);
            state.selectedNodeindexMap.set(saveData._id, state.viewNodeId);
            state.viewNodeId += 1;
        },
        async updateSelectedNode(state, node) {
            if (node.viewId) {
                const deleteIdx = await state.selectedNodeList.findIndex(
                    (x) => x.viewId === node.viewId,
                );
                if (deleteIdx > -1) {
                    await state.selectedNodeList.splice(deleteIdx, 1);
                    const saveData = node;
                    saveData.viewId = state.viewNodeId;
                    state.selectedNodeindexMap.set(node._id, saveData.viewId);
                    state.viewNodeId += 1;
                    await state.selectedNodeList.push(saveData);
                    state.selectedNodeindexMap[saveData._id] = saveData.viewId;
                }
            } else if (state.selectedNodeindexMap.has(node._id)) {
                const viewId = await state.selectedNodeindexMap.get(node._id);
                const deleteIdx = await state.selectedNodeList.findIndex(
                    (x) => x.viewId === viewId,
                );
                if (deleteIdx > -1) {
                    await state.selectedNodeList.splice(deleteIdx, 1);
                    const saveData = node;
                    saveData.viewId = state.viewNodeId;
                    state.selectedNodeindexMap.set(node._id, saveData.viewId);
                    state.viewNodeId += 1;
                    await state.selectedNodeList.push(saveData);
                }
            } else {
                const saveData = node;
                saveData.viewId = state.viewNodeId;
                await state.selectedNodeList.push(saveData);
                await state.selectedNodeindexMap.set(saveData._id, state.viewNodeId);
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
        sortByViewId(state) {
            state.selectedNodeList.sort((a, b) => b.viewId - a.viewId);
        },
        sortByColor(state) {
            state.selectedNodeList.sort((a, b) => {
                if (a.color < b.color) return 1;
                if (a.color > b.color) return -1;
                return 0;
            });
        },
        sortByCategory(state) {
            state.selectedNodeList.sort((a, b) => {
                if (a.category < b.category) return 1;
                if (a.category > b.category) return -1;
                return 0;
            });
        },
        sortByName(state) {
            state.selectedNodeList.sort((a, b) => {
                if (a.name < b.name) return 1;
                if (a.name > b.name) return -1;
                return 0;
            });
        },
    },
    actions: {
    },
    modules: {
    },
};

export default Node;
