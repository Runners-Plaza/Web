<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
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
