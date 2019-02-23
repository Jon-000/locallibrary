
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import Cookie from 'js-cookie';

const store = new Vuex.Store({
  state: {
    count: 0,
    isLoggedIn: false,
    user: null,
  },
  mutations: {
    increment(state) {
      state.count++
    },
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      Cookie.remove('jwt_token')
      state.isLoggedIn = false
    }
  },
  actions: {
    login(context) {

    }
  }
})

export default store;