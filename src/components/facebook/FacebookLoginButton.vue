<template>
  <v-btn v-on:click="login" color="info">{{ this.$t ('login.from.facebook') }}</v-btn>
</template>


<script>
export default {
  name: "FacebookLoginButton",
  methods: {
    login () {
      this.facebook.login ()
    },
  },
}
</script>
