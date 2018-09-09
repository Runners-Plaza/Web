<template>
  <v-app>
    <the-sidebar />
    <the-toolbar />
    <v-content>
      <router-view />
    </v-content>
    <the-footer />
  </v-app>
</template>

<script>
import TheSidebar from './components/TheSidebar';
import TheToolbar from './components/TheToolbar';
import TheFooter from './components/TheFooter';

export default {
  name: 'App',
  components: {
    TheSidebar,
    TheToolbar,
    TheFooter
  },
  methods: {},
  created() {
    let self = this;
    this.facebook.afterSuccess((response) => {
      self.oauth.setTokenData(response.authResponse);
      self.runnersPlaza.setTokenData(response.authResponse);
      self.login().then(() => {
        self.$router.replace({ name: 'home' });
      });
    });
    let tokenData = this.oauth.getTokenData();
    if (tokenData) {
      if (this.$router.history.current.name === 'login') {
        this.$router.replace({ name: 'home' });
      }
      this.runnersPlaza.setTokenData(tokenData);
      this.login();
    } else {
      this.$router.replace({ name: 'login' });
    }
  }
}
</script>
