<template>
  <v-form v-model="valid" class="profile ma-3">
    <v-text-field
      v-model="name"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      @click="updateProfile(name, email)"
    >
    submit
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'users',
  data () {
    return {
      valid: false,
      name: null,
      email: null,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  created () {
    if (this.me.name === undefined || this.me.email === undefined) {
      this.runnersPlaza.getMyself ().then ((me) => {
        this.name = me.name
        this.email = me.email
      })
    } else {
      this.name = this.me.name
      this.email = this.me.email
    }
  },
  methods: {
    updateProfile (name, email) {
      let me = this.me
      let newMe = Object.assign ({}, me)
      newMe.name = name
      newMe.email = email
      this.runnersPlaza.updateMyself (newMe).then (newMe => {
        Object.assign (this.me, newMe)
      })
    }
  },
}
</script>

<style scoped>
.profile {
  background: inherit
}
</style>
