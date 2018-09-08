<template>
<v-btn v-on:click="login" color="info">Login From Facebook</v-btn>
</template>


<script>
import "../../assets/FacebookAsset.js";
import Facebook from '../../classes/Facebook.js'

let facebook = null;

export default {
  name: "FacebookLoginButton",
  methods: {
    getFacebookInstance: function() {
      let self = this;
      if (facebook === null) {
        facebook = new Facebook(function(response) {
          let headers = {
            Authorization: "Bearer " + response.authResponse.accessToken,
          };
          self.$http
            .get(process.env.VUE_APP_API_ENDPOINT_BASE + "/user", {
              headers: headers
            })
            .then(
              response => {
                // TODO: handle success
                console.log(response);
              },
              response => {
                console.log(response);
                self.$http
                  .patch(process.env.VUE_APP_API_ENDPOINT_BASE + "/user", "", {
                    headers: headers
                  })
                  .then(
                    response => {
                      // TODO: handle success
                      console.log(response);
                    },
                    response => {
                      console.log(response);
                    }
                  );
              }
            );
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
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v3.1" // use graph api version 2.8
      });
    };
  }
};
</script>