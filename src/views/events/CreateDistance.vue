<template>
  <v-form
    ref="form"
    v-model="valid"
    class="distance-create ma-3"
    lazy-validation
    >
    <v-btn color="success"
      :to="`/events/${id}/update`"
    v-text="$t ('back_to.previous_page')" />
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
      :counter="100"
      :label="$t ('distance.time_limit')"
    ></v-text-field>

    <v-text-field
      v-model="form.runner_time_limit"
      :counter="100"
      :label="$t ('distance.runner_time_limit')"
      required
    ></v-text-field>

    <v-btn
      block
      dark
      :disabled="!valid"
      color="teal darken-1"
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
        time_limit: '',
        runner_time_limit: '',
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

<style>
.distance-create {
  background: inherit
}
</style>
