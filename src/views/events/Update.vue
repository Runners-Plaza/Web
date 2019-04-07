<template>
  <v-form
    ref="form"
    v-model="valid"
    class="profile ma-3"
    lazy-validation
  >
    <v-btn color="success"
       to="/events"
       v-text="$t ('back_to.list')" />
    <h3 align="center">{{ $t ('contest.edit') }}</h3>
    <v-text-field
      v-model="form.name"
      :counter="100"
      :rules="nameRules"
      :label="$t ('contest_name')"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.english_name"
      :counter="100"
      :label="$t ('contest_english_name')"
    ></v-text-field>

    <v-text-field
      v-model="form.organizer"
      :counter="100"
      :rules="nameRules"
      :label="$t ('organizer')"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.english_organizer"
      :counter="100"
      :label="$t ('english_organizer')"
    ></v-text-field>

    <v-text-field
      v-model="form.location"
      :counter="100"
      :rules="nameRules"
      :label="$t ('location')"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.english_location"
      :counter="100"
      :label="$t ('english_location')"
    ></v-text-field>

    <v-text-field
      v-model="form.region"
      :counter="100"
      :rules="nameRules"
      :label="$t ('region')"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.url"
      :counter="200"
      :rules="urlRules"
      :label="$t ('link')"
      required
    ></v-text-field>

    <v-datetime-picker
      :label="$t ('start_at')"
      locale="zh-tw"
      v-model="form.start_at">
    </v-datetime-picker>

    <v-datetime-picker
      :label="$t ('sign_start_at')"
      locale="zh-tw"
      v-model="form.sign_start_at">
    </v-datetime-picker>

    <v-datetime-picker
      :label="$t ('sign_end_at')"
      locale="zh-tw"
      v-model="form.sign_end_at">
    </v-datetime-picker>

    <v-checkbox
      v-model="form.iaaf"
      :label="$t ('iaaf')"
    ></v-checkbox>

    <v-checkbox
      v-model="form.aims"
      :label="$t ('aims')"
    ></v-checkbox>
    
    <v-checkbox
      v-model="form.measured"
      :label="$t ('measured')"
    ></v-checkbox>

    <v-checkbox
      v-model="form.recordable"
      :label="$t ('recordable')"
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      @click="validate"
    >
      {{ $t ('submit') }}
    </v-btn>

  </v-form>

</template>

<script>
export default {
  name: 'EventUpdate',
  data () {
    return {
      valid: false,
      id: null,
      form: {
        name: '',
        english_name: '',
        organizer: '',
        english_organizer: '',
        location: '',
        english_location: '',
        level: '',
        region: '',
        url: '',
        start_at: null,
        sign_start_at: null,
        sign_end_at: null,
        iaaf: false,
        aims: false,
        measured: false,
        recordable: false,
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 100) || 'Name must be less than 100 characters'
      ],
      urlRules: [
        v => !!v || 'Url is required',
        v => (v && v.length <= 200) || 'Url must be less than 100 characters'
      ],
    }
  },
  created () {
    if ( ! this.hasPermission (true)) {
      this.$router.replace ('/events/index')
    }
    this.id = this.$route.params.id
    this.runnersPlaza.getEvent (this.id).then (event => {
      this.form = event
    })
  },
  methods: {
    submit () {
      let submitForm = {}
      Object.assign (submitForm, this.form)
      //TODO: Add distance handling
      submitForm.distance = []
      this.runnersPlaza.patchEvent (this.id, submitForm).then ((event) => {
        this.form = event
      })
    },
    validate () {
      if (this.$refs.form.validate()) {
	this.submit()
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  },
}
</script>

<style>
.profile {
  background: inherit
}
</style>
