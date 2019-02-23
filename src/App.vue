<template>
  <div id="app">
    <el-container>
      <el-header >
        <el-menu style="" router mode="horizontal">
          <el-menu-item index="/home"><h1>Local Library</h1></el-menu-item>
          <el-menu-item index="/about">About</el-menu-item>
          <!-- <el-button @click="goTo()">login</el-button> -->
          <div>
            {{count}}
          </div>
          <i class="el-icon-arrow-right" style="color:white;background:red;"></i>
          <my-login></my-login>



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
import MyLogin from './components/MyLogin'
import axios from 'axios';
import Cookie from 'js-cookie';
import { mapState } from 'vuex';
// import Layout from "./views/layout/Layout.vue";
export default {
  name: 'app',
  components: {
    HelloWorld,
    MyLogin
  },
  data() {
    return {
    }
  },
  created: function () {
    // 当app创建时,即本应用任意子路由下加载时,都会创建vue app,此时检查登录状态
    // 查看cookie中是否有jwt token
    console.log(document.cookie)
    console.log(Cookie.get('url_before_oauth'))
    const jwt_token = Cookie.get('jwt_token') // 无则返回`undefined`
    if (jwt_token) {
      // 改变app的登录状态
      console.log('get')
      this.$store.commit('login')
    } else {
      console.log('is not logged in')
    }


  },
  methods: {
    handleOpen(key, keyPath) {
      this.$router.push('/catalog/book')
    },
  },

    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        console.log('to:')
        console.log(to)
        console.log('from:')
        console.log(from)
      }
    },
    computed: {
      ...mapState({
        count: state => state.count,
        isLoggedIn: state => state.isLoggedIn
      })

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