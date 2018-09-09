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
import TheSidebar from "./components/TheSidebar";
import TheToolbar from "./components/TheToolbar";
import TheFooter from "./components/TheFooter";

export default {
  name: "App",
  components: {
    TheSidebar,
    TheToolbar,
    TheFooter
  },
  methods: {},
  created() {
    var self = this;
    this.facebook.afterSuccess((response) => {
        self.oauth.setTokenData(response.authResponse);
        self.runnersPlaza.setTokenData(response.authResponse);
        self.login().then(() => {
          self.$router.replace({ name: "home" });
        });
    });
    var tokenData = this.oauth.getTokenData();
    if (tokenData) {
      this.runnersPlaza.setTokenData(tokenData);
      this.login().then(() => {
        if (this.$router.history.current.name == "login" && this.me.show) {
          this.$router.replace({ name: "home" });
        }
      });
    } else this.$router.replace({ name: "login" });
  }
};
</script>
