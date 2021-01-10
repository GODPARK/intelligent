import Node from './node';
import Search from './search';
import Connect from './connect';

const Api = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
    },
    modules: {
        node: Node,
        search: Search,
        link: Connect,
    },
};

export default Api;
