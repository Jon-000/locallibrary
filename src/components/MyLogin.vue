<template>
  <div style="border:1px solid red;float:right; ">
    login compoent

    <div v-if="isLoggedIn">头像
      <el-button @click="logout" >登出</el-button>
    </div>
    <div v-else>
      <el-button @click="goToOauth" :loading="isLoggingIn">使用github登录</el-button>
    </div>


    <router-link to="/logging">
      <el-button id="myButton" class="foo bar">Go!</el-button>
    </router-link>
    <!-- <router-view name="mylogging"></router-view> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Cookie from 'js-cookie';
export default {
  data: function() {
    return {
      isLoggingIn: false
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.isLoggedIn,
      user: (state) => state.user,
    })
  },
  created: function() {
    console.log('Login component created')
  },
  mounted() {
  },
  methods: {
    goToOauth() {
      this.isLoggingIn = true;
      // console.log('goo')
      // console.log(process.env.NODE_ENV)
      // console.log(process.env.VUE_APP_GITHUB_OAUTH_CLIENT_ID)
      let client_id = process.env.VUE_APP_GITHUB_OAUTH_CLIENT_ID
      let redirect_uri = process.env.VUE_APP_GITHUB_OAUTH_REDIRECT_URI
      let scope = 'read:user'
      let u = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`
      console.log(u)
      localStorage.urlBeforeAuth = this.$route.path
      // Cookie.remove('jwt_token')
      // Cookie.remove('url_before_auth')
      Cookie.set('url_before_oauth', this.$route)
      window.location.href = u
    },
    logout() {
      this.$store.commit('logout')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
4