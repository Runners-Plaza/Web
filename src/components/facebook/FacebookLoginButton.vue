<template>
  <v-btn v-on:click="login" color="info">Login From Facebook</v-btn>
</template>


<script>
import Facebook from "../../classes/Facebook.js";
import "../../assets/FacebookAsset.js";

let facebook = null;

export default {
  name: "FacebookLoginButton",
  methods: {
    getFacebookInstance: function() {
      let self = this;
      if (facebook === null) {
        facebook = new Facebook(function(response) {
          self.oauth.setTokenData(response.authResponse);
          self.$router.go(0);
        });
      }
      return facebook;
    },
    login: function() {
      let facebook = this.getFacebookInstance();
      facebook.checkLoginState();
    }
  },
  mounted() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: process.env.VUE_APP_FACEBOOK_LOGIN_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v3.1"
      });
    };
  }
};
</script>
