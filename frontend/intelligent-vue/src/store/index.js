import Vue from 'vue';
import Vuex from 'vuex';
import Node from './api/node';
import Search from './view/search';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    node: Node,
    search: Search,
  },
});
