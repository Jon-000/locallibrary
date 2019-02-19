<template>
  <div id="app">
    <el-container>
      <el-header >
        <el-menu style="" router mode="horizontal">
          <el-menu-item index="/home"><h1>Local Library</h1></el-menu-item>
          <el-menu-item index="/about">About</el-menu-item>
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
// import Layout from "./views/layout/Layout.vue";
export default {
  name: 'app',
  components: {
    HelloWorld,
  },
  methods: {
    handleOpen(key, keyPath) {
      this.$router.push('/catalog/book')
    }
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