<template>
  <v-container fluid>
    <v-layout column wrap>
      <v-form v-model="valid">
        <v-text-field
          v-model="name"
          :label="$t ('name')"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          :label="$t ('email')"
          required
        ></v-text-field>
        <v-btn
          block
          dark
          :disabled="!valid"
          color="blue lighten-3"
          @click="updateProfile(name, email)"
          v-text="$t ('save')" />
      </v-form>
    </v-layout>
  </v-container>
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
