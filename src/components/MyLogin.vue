<template>
  <div class="wrapper" >

    <div class="container">
      <div v-if="user">
          <el-popover
            placement="bottom"
            :title="user.github_login"
            width="200"
            trigger="click"
            >
          <div style="">
            setting
          </div>
          <el-button @click="logout" >登出</el-button>
            <div slot="reference" class="avatar-container"
              :style="{backgroundImage: 'url(' + user.github_avatar_url + ')'}">
            </div>
          </el-popover>
      </div>

      <div v-else>
        <el-button @click="goToOauth" :loading="isLoggingIn">使用github登录</el-button>
      </div>
    </div>




    <!-- <router-link to="/logging">
      <el-button id="myButton" class="foo bar">Go!</el-button>
    </router-link> -->
    <!-- <router-view name="mylogging"></router-view> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Cookie from 'js-cookie';
export default {
  data: function() {
    return {
      isLoggingIn: false,
      showSetting: false,
    }
  },
  computed: {
    avatarImageUrl:function() {
      // return this.
    },
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
      // console.log(u)
      localStorage.urlBeforeAuth = this.$route.path
      // Cookie.remove('jwt_token')
      // Cookie.remove('url_before_auth')
      Cookie.set('url_before_oauth', this.$route.path)
      window.location.href = u
    },
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;

  .container {
    position:absolute;
    top:50%;
    right:50%;
    transform:translate(50%, -50%);
  }
}
.avatar-container {
  width: 30px;
  height: 30px;
  border: 1px solid #666;
  background-size: contain;
  // border-radius: 50%;

}
</style>
