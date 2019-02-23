<template>
  <div>
    logging compoent
  </div>
</template>

<script>
import { mapState } from 'vuex';
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
    console.log('Logging component created')
    console.log(
      document.cookie
    )
    console.log(this.isLoggingIn)
    console.log(this.isLoggedIn)
    console.log(this.user)
  },
  mounted() {
  },
  methods: {
    goTo() {
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
      window.location.href = u
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
