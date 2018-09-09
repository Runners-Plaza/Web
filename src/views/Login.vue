<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <FacebookLoginButton />
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import FacebookLoginButton from '@/components/facebook/FacebookLoginButton.vue'

export default {
  name: "Login",
  props: {
    msg: String,
  },
  components: {
    FacebookLoginButton,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
