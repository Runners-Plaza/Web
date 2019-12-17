<template>
  <v-container fluid>
    <v-btn color="blue lighten-3"
       to="/events"
       v-text="$t ('back_to.list')" />
    <v-btn color="blue lighten-3"
       @click="createDistance ()"
       v-text="$t ('distance.create')" />
    <v-layout column wrap>
      <v-tabs
        slider-color="blue"
        centered
        v-model="chosen_tab"
      >
        <v-tab :href="`#detail`">
          {{ $t ('contest.detail') }}
        </v-tab>
        <v-tab :href="`#distances`">
          {{ $t ('contest.distances') }}
        </v-tab>
        <v-tab :href="`#records`">
          {{ $t ('contest.records') }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="chosen_tab">
        <v-tab-item :value="`detail`">
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
        </v-tab-item>
        <v-tab-item :value="`distances`">
          <v-list three-line>
            <v-list-tile
              v-for="(distance, index) in distances"
              @click="updateDistance (distance.id)"
              :key="index">
              <v-list-tile-content>
                <v-list-tile-title v-html="distance.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="distance.distance"></v-list-tile-sub-title>
                <v-list-tile-title v-html="distance.cost"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-tab-item>
        <v-tab-item :value="`records`">
          <v-list three-line>
            <v-list-tile
              v-for="(record, index) in records"
              @click="recordDetail (record.id)"
              :key="index">
              <v-list-tile-content>
                <v-list-tile-title v-html="record.distance.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="formattedTime (record.time)"></v-list-tile-sub-title>
                <v-list-tile-title v-html="record.runner.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
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
      distances: null,
      records: null,
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
    if ( ! this.hasPermission (true)) {
      this.$router.replace ('/events/index')
    }
    this.id = this.$route.params.id
    this.runnersPlaza.getEvent (this.id).then (event => {
      this.form = event
      this.form.start_at = this.convertFormattedDate (this.form.start_at)
      this.form.sign_start_at = this.convertFormattedDate (this.form.sign_start_at)
      this.form.sign_end_at = this.convertFormattedDate (this.form.sign_end_at)
      this.runnersPlaza.getDistances (this.id).then (distances => {
        this.distances = distances
      })
      this.runnersPlaza.getRecordsOfEvent (this.id).then (records => {
        this.records = records
      })
    })
  },
  methods: {
    submit () {
      let submitForm = {}
      console.log (this.form)
      Object.assign (submitForm, this.form)

      submitForm.start_at = this.convertDate (submitForm.start_at)
      submitForm.sign_start_at = this.convertDate (submitForm.sign_start_at)
      submitForm.sign_end_at = this.convertDate (submitForm.sign_end_at)
      this.runnersPlaza.patchEvent (this.id, submitForm).then ((event) => {
        this.form = event
        this.form.start_at = this.convertFormattedDate (this.form.start_at)
        this.form.sign_start_at = this.convertFormattedDate (this.form.sign_start_at)
        this.form.sign_end_at = this.convertFormattedDate (this.form.sign_end_at)
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
    createDistance () {
      this.$router.replace ('/events/' + this.id + '/distances/create')
    },
    updateDistance (id) {
      this.$router.replace ('/events/' + this.id + '/distances/' + id + '/update')
    },
    recordDetail (id) {
      this.$router.replace ('/events/' + this.id + '/records/' + id)
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
