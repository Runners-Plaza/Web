<template>
  <v-container fluid>
    <v-btn color="blue lighten-3"
       to="/events"
       v-text="$t ('back_to.list')" />
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

        <v-text-field
          v-model="distance_form.name"
          :label="$t ('distance.name')"
        ></v-text-field>

        <v-text-field
          v-model="distance_form.distance"
          :label="$t ('distance.number')"
        ></v-text-field>

        <v-text-field
          v-model="distance_form.cost"
          :label="$t ('distance.cost')"
        ></v-text-field>

        <v-text-field
          v-model="distance_form.time_limit"
          :label="$t ('distance.time_limit')"
        ></v-text-field>

        <v-text-field
          v-model="distance_form.runner_limit"
          :label="$t ('distance.runner_limit')"
        ></v-text-field>

        <v-btn
          block
          dark
          :disabled="!valid"
          color="blue lighten-3"
          @click="validate"
        >
          {{ $t ('submit') }}
        </v-btn>

        <v-btn
          block
          dark
          color="error"
          @click="reset"
        >
          {{ $t ('reset_form') }}
        </v-btn>
      </v-form>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'EventsCreate',
  data () {
    return {
      valid: false,
      form: {
        name: '',
        english_name: '',
        organizer: '',
        english_organizer: '',
        location: '',
        english_location: '',
        level: 'Full',
        region: 'Northern',
        url: '',
        start_at: null,
        sign_start_at: null,
        sign_end_at: null,
        iaaf: false,
        aims: false,
        measured: false,
        recordable: false,
      },
      distance_form: {
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
  mounted () {
    if ( ! this.hasPermission (true)) {
      this.$router.replace ({ name: 'event_index', })
    }
  },
  methods: {
    submit () {
      let submitForm = {}
      Object.assign (submitForm, this.form)

      submitForm.start_at = this.convertDate (submitForm.start_at)
      submitForm.sign_start_at = this.convertDate (submitForm.sign_start_at)
      submitForm.sign_end_at = this.convertDate (submitForm.sign_end_at)
      submitForm.distance = []
      this.runnersPlaza.postEvent (submitForm).then ((event) => {
        if (event.id != undefined) {
          if (this.distance_form.name !== '' && this.distance_form.cost !== null && this.distance_form.runner_limit !== '') {
            this.runnersPlaza.postDistance (event.id, this.distance_form).then ((distance) => {
              this.$router.replace ('/events/' + event.id + '/update')
            })
          } else {
            this.$router.replace ('/events/' + event.id + '/update')
          }
        }
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
