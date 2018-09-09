<template>
  <v-btn v-on:click="login" color="info">Login From Facebook</v-btn>
</template>


<script>
export default {
  name: "FacebookLoginButton",
  methods: {
    login: function() {
      this.facebook.checkLoginState()
    }
  },
}
</script>
