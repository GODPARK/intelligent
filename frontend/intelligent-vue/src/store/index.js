import Vue from 'vue';
import Vuex from 'vuex';
import Api from './api/index';
import View from './view/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    darkMode: false,
  },
  getters: {
    getDarkMode(state) {
      return state.darkMode;
    },
  },
  mutations: {
    setDarkMode(state, value) {
      state.darkMode = value;
    },
  },
  actions: {
  },
  modules: {
    api: Api,
    view: View,
  },
});
