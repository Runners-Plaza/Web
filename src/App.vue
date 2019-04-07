<template>
  <v-app>
    <the-sidebar />
    <the-toolbar />
    <v-content>
      <router-view />
      <the-toast />
    </v-content>
    <the-footer />
  </v-app>
</template>

<script>
import TheSidebar from './components/TheSidebar'
import TheToolbar from './components/TheToolbar'
import TheFooter from './components/TheFooter'
import TheToast from './components/TheToast'

export default {
  name: 'App',
  components: {
    TheSidebar,
    TheToolbar,
    TheFooter,
    TheToast,
  },
  created () {
    let tokenData = null
    let language = this.$cookie.get ('language')

    if (language === null) {
      this.$cookie.set ('language', this.$i18n.locale, '1')
    } else {
      this.$i18n.locale = language
    }

    this.facebook.afterSuccess ((response) => {
      this.oauth.setTokenData (response.authResponse)
      this.runnersPlaza.setTokenData (response.authResponse)
      this.login ().then (() => {
        this.toaster.success (this.$t ('login.success'))
        this.$router.replace ({ name: 'home' })
      })
    })
    tokenData = this.oauth.getTokenData ()
    if (tokenData) {
      if (this.$router.history.current.name === 'login') {
        this.$router.replace ({ name: 'home' })
      }
      this.runnersPlaza.setTokenData (tokenData)
      this.login ().then (() => {
        this.toaster.success (this.$t ('login.success'))
      })
    } else {
      this.runnersPlaza.setTokenData ()
    }
  },
}
</script>
