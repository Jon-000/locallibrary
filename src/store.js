
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import Cookie from 'js-cookie';
const jwtDecode = require('jwt-decode');

import apiA from '~/service/api';

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
      Cookie.remove('jwt_token');
      state.isLoggedIn = false
    },
    setUserInfoFromJWT(state) {
      const jwt_token = Cookie.get('jwt_token');
      const jwt_info = jwtDecode(jwt_token);
      state.user = jwt_info;
      // console.log(state.user)
    },
    setUserInfo(state, user_detail) {
      // console.log(user_detail)
      state.user = user_detail
    },
    resetUserInfo(state) {
      state.user = null
    }

  },
  actions: {
    login(context, user_name) {
      context.dispatch('getUserDetail', user_name)
      // context.commit('login');
    },
    logout({commit}) {
      commit('resetUserInfo');
      commit('logout')
    },
    checkLogin({dispatch, commit}) {
      const jwt_token = Cookie.get('jwt_token')
      if (jwt_token) {
        context.dispatch('login')
      } else {
        //提示登录
      }
    },
    getUserDetail({state, commit}, user_name) {
      apiA
        .get(`/api/user/${user_name}`)
        .then((result) => {
          // console.log(result.data.user_detail);
          commit('setUserInfo', result.data.user_detail)
          commit('login')
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        })
    },
    initApp(context) {
      context.commit('checkLogin')
    }
  }
})

export default store;