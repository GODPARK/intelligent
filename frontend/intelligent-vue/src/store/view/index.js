import Search from './search';
import Node from './node';
import Home from './home';

const View = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
    },
    modules: {
        search: Search,
        node: Node,
        home: Home,
    },
};

export default View;
