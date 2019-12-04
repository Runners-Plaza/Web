<template>
  <v-container fluid>
    <v-btn color="blue lighten-3"
      :to="`/events/${id}/update`"
      v-text="$t ('back_to.previous_page')" />
    <v-layout column wrap>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
        <v-text-field
          v-model="form.name"
          :counter="100"
          :rules="nameRules"
          :label="$t ('distance.name')"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.distance"
          :label="$t ('distance.number')"
        ></v-text-field>

        <v-text-field
          v-model="form.cost"
          :label="$t ('distance.cost')"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.time_limit"
          :label="$t ('distance.time_limit')"
        ></v-text-field>

        <v-text-field
          v-model="form.runner_limit"
          :label="$t ('distance.runner_time_limit')"
          required
        ></v-text-field>

        <v-btn
          block
          dark
          :disabled="!valid"
          color="blue lighten-3"
          @click="validate">
          {{ $t ('submit') }}
        </v-btn>

        <v-btn
          block
          dark
          color="error"
          @click="reset">
          {{ $t ('reset_form') }}
        </v-btn>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'CreateDistance',
  data () {
    return {
      valid: false,
      id: null,
      form: {
        name: '',
        distance: 0,
        cost: 0,
        time_limit: 0,
        runner_limit: 0,
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 100) || 'Name must be less than 100 characters'
      ],
    }
  },
  created () {
    if ( ! this.hasPermission (true)) {
      this.$router.replace ('/events/index')
    }
    this.id = this.$route.params.id
  },
  methods: {
    submit () {
      this.runnersPlaza.postDistance(this.id, this.form).then ((distance) => {
        this.$router.replace ('/events/' + this.id + '/update')
      })
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.submit()
      }
    },
    reset () {
      if (confirm(this.$t('confirm.reset_form'))) {
        this.$refs.form.reset()
      }
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  },
}
</script>
