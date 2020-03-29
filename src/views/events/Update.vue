<template>
  <v-container fluid>
    <v-btn color="blue lighten-3"
       @click="backToDetail ()"
       v-text="$t ('back_to.list')" />
    <v-layout column wrap>
      <v-form
        ref="form"
        v-model="valid"
        class="profile ma-3"
        lazy-validation
      >
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

        <v-select :items="levelLabels" item-text="text" item-value="level" v-model="form.level" />
        <p>{{ $t ('level') }}</p>

        <v-select :items="regionLabels" item-text="text" item-value="region" v-model="form.region" />
        <p>{{ $t ('region') }}</p>

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
          color="blue lighten-3"
          @click="validate"
        >
          {{ $t ('submit') }}
        </v-btn>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'EventUpdate',
  data () {
    return {
      valid: false,
      id: null,
      chosen_tab: 'detail',
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
  computed: {
    levelLabels () {
      return [
        {
          level: 'Activity',
          text: this.$t ('levels.activity'),
        },
        {
          level: 'Relay',
          text: this.$t ('levels.relay'),
        },
        {
          level: 'Trilathon',
          text: this.$t ('levels.trilathon'),
        },
        {
          level: 'LessThanTen',
          text: this.$t ('levels.less_than_ten'),
        },
        {
          level: 'TenToHalf',
          text: this.$t ('levels.ten_to_half'),
        },
        {
          level: 'Half',
          text: this.$t ('levels.half'),
        },
        {
          level: 'Full',
          text: this.$t ('levels.full'),
        },
        {
          level: 'Ultra',
          text: this.$t ('levels.ultra'),
        },
      ]
    },
    regionLabels () {
      return [
        {
          region: 'Northern',
          text: this.$t ('regions.northern'),
        },
        {
          region: 'Central',
          text: this.$t ('regions.central'),
        },
        {
          region: 'Southern',
          text: this.$t ('regions.southern'),
        },
        {
          region: 'Eastern',
          text: this.$t ('regions.eastern'),
        },
        {
          region: 'Others',
          text: this.$t ('regions.others'),
        },
      ]
    },
  },
  created () {
    this.id = this.$route.params.id
    if ( ! this.hasPermission (true)) {
      this.$router.replace ('/events/' + this.id)
    }
    this.getEvent ()
  },
  methods: {
    backToDetail () {
      this.$router.replace ('/events/' + this.id)
    },
    async getEvent () {
      this.form = await this.runnersPlaza.getEvent (this.id)
      this.form.start_at = this.convertFormattedDate (this.form.start_at)
      this.form.sign_start_at = this.convertFormattedDate (this.form.sign_start_at)
      this.form.sign_end_at = this.convertFormattedDate (this.form.sign_end_at)
    },
    submit () {
      let submitForm = {}
      Object.assign (submitForm, this.form)

      submitForm.start_at = this.convertDate (submitForm.start_at)
      submitForm.sign_start_at = this.convertDate (submitForm.sign_start_at)
      submitForm.sign_end_at = this.convertDate (submitForm.sign_end_at)
      this.runnersPlaza.patchEvent (this.id, submitForm).then ((event) => {
        this.$router.replace ('/events/' + this.id)
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
    },
    formattedTime (time) {
      let hours = Math.floor (time / 3600)
      let minutes = Math.floor ((time % 3600) / 60)
      let seconds = time % 60
      return hours + ':' + minutes + ':' + seconds
    },
  },
}
</script>
