<template>
  <div id="app">
    <el-container>
      <el-header >
        <el-menu style="" router mode="horizontal">
          <el-menu-item index="/home"><h1>Local Library</h1></el-menu-item>
          <el-menu-item index="/about">About</el-menu-item>
          <el-button @click="goTo()">login</el-button>
          <i class="el-icon-arrow-right" style="color:white;background:red;"></i>
        </el-menu>
      </el-header>

      <el-container style="margin-top:10px;">
        <el-aside>
          <el-menu router mode="vertical"
            :default-active="$route.path"
            @open="handleOpen">
            <el-submenu index="/catalog" >
              <template slot="title">
                <span>书目</span>
              </template>
              <el-menu-item index="/catalog/book">所有图书</el-menu-item>
              <el-menu-item index="/catalog/author">所有作者</el-menu-item>
              <el-menu-item index="/catalog/genre">所有类型</el-menu-item>
              <el-menu-item index="/catalog/bookinstance">所有拷贝</el-menu-item>
            </el-submenu>
            <el-submenu index="">
              <template slot="title">
                <span>管理</span>
              </template>
              <el-menu-item index="/catalog/book/create">添加图书</el-menu-item>
              <el-menu-item index="/catalog/author/create">添加作者</el-menu-item>
            </el-submenu>
          </el-menu>
          
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios';
// import Layout from "./views/layout/Layout.vue";
export default {
  name: 'app',
  components: {
    HelloWorld,
  },
  data() {
    return {
      client_id: process.env.VUE_APP_GITHUB_OAUTH_CLIENT_ID,
      scope: 'read:user',
      state: 'foo',
      getCodeURL: 'https://github.com/login/oauth/authorize',

      code: null,
      getUserURl: 'https://api.github.com/user',
    }
  },
  created: function () {
    console.log(this.$route.path)
    // when code in url
    if (this.code) {
      console.log(this.code)
    }
    else {
      // if no code in top, get accessToken from cookie

    }
  },
  methods: {
    handleOpen(key, keyPath) {
      this.$router.push('/catalog/book')
    },
    goTo() {
      // console.log('goo')
      // console.log(process.env.NODE_ENV)
      // console.log(process.env.VUE_APP_GITHUB_OAUTH_CLIENT_ID)
      let client_id = process.env.VUE_APP_GITHUB_OAUTH_CLIENT_ID
      let client_secret = process.env.VUE_APP_GITHUB_OAUTH_CLIENT_SECRET
      let redirect_uri = process.env.VUE_APP_GITHUB_OAUTH_REDIRECT_URI
      let scope = 'read:user'
      let u = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`
      console.log(u)
      localStorage.urlBeforeAuth = this.$route.path
      window.location.href = u
    },
  }
}
</script>

<style lang="scss">
@import url('./reset.css');
html, body, #app, .el-container, .el-menu {
  height: 100%;

}
h1 {
  font-size: 1.5rem;
  font-weight: 600;
}



</style>