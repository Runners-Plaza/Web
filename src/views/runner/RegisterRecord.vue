<template>
  <v-container fluid>
    <v-btn color="blue lighten-3"
       @click="backToList ()"
       v-text="$t ('back_to.list')" />
    <v-layout column wrap>
      <v-form
        ref="form"
        v-model="valid"
        v-if="event"
        lazy-validation
      >
        <v-text-field
          v-model="event.name"
          :label="$t ('contest_name')"
          readonly
        ></v-text-field>
        <v-select
          :items="event.distances"
          item-text="name"
          item-value="id"
          :label="$t ('distance.select')"
          v-model="form.distance_id"
          :rules="selectRules"
          outlined
          required
        ></v-select>

        <v-text-field
          v-model="form.bib_number"
          :label="$t ('bib_number')"
          :rules="numberRules"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.group"
          :counter="100"
          :label="$t ('group')"
        ></v-text-field>

        <p>{{ $t ('contest_complete_time') }}</p>
        <div class="d-flex">
          <v-text-field
            v-model="form.hours"
            :rules="numberRules"
            :label="$t ('hours')"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.minutes"
            :rules="numberRules"
            :label="$t ('minutes')"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.seconds"
            :rules="numberRules"
            :label="$t ('seconds')"
            required
          ></v-text-field>
        </div>

        <p>{{ $t ('contest_chip_time') }}</p>
        <div class="d-flex">
          <v-text-field
            v-model="form.chip_hours"
            :rules="numberOptionRules"
            :label="$t ('hours')"
          ></v-text-field>
          <v-text-field
            v-model="form.chip_minutes"
            :rules="numberOptionRules"
            :label="$t ('minutes')"
          ></v-text-field>
          <v-text-field
            v-model="form.chip_seconds"
            :rules="numberOptionRules"
            :label="$t ('seconds')"
          ></v-text-field>
        </div>

        <v-text-field
          v-model="form.rank"
          :label="$t ('rank')"
          :rules="numberRules"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.group_rank"
          :label="$t ('group_rank')"
          :rules="numberRules"
        ></v-text-field>

        <v-text-field
          v-model="form.remark"
          :counter="100"
          :label="$t ('remark')"
        ></v-text-field>

        <v-list-tile-sub-title v-text="$t ('certificate')" />
        <input
          type="file"
          ref="upload"
          @change="handleFileUpload"
        />

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
  name: 'RegisterRecord',
  data () {
    return {
      valid: false,
      id: null,
      event: null,
      form: {
        distance_id: 0,
        bib_number: '',
        group: '',
        hours: 0,
        minutes: 0,
        seconds: 0,
        chip_hours: 0,
        chip_minutes: 0,
        chip_seconds: 0,
        time: 0,
        chip_time: 0,
        rank: null,
        group_rank: null,
        remark: '',
      },
      certificate_form: {
        certificate: null,
      },
      stringRules: [
        v => !!v || 'This field is required',
        v => (v && v.length <= 100) || 'Name must be less than 100 characters'
      ],
      numberRules: [
        v => /^\d+$/.test(v) || 'This field should be filled in numbers'
      ],
      numberOptionRules: [
        v => /^\d+$/.test(v) || 'This field should be filled in numbers'
      ],
      selectRules: [
        v => !!v || 'This field is required',
      ],
    }
  },
  mounted () {
    this.id = this.$route.params.id
    if ( ! this.hasPermission (true)) {
      this.$router.replace ('/events/' + this.id)
    }
    this.getEventDetail ()
  },
  methods: {
    backToList () {
      this.$router.replace ('/runner/register_record')
    },
    async getEventDetail () {
      this.event = await this.runnersPlaza.getEvent (this.id)
    },
    submit () {
      let formData = null

      this.form.time = this.form.hours * 3600 + this.form.minutes * 60 + this.form.seconds * 1
      this.form.chip_time = this.form.chip_hours * 3600 + this.form.chip_minutes * 60 + this.form.chip_seconds * 1
      this.runnersPlaza.postDistanceRecord(this.form.distance_id, this.form).then ((record) => {
        if (record.id != undefined) {
          if (this.certificate_form.certificate !== null) {
            formData = new FormData()
            formData.append('certificate', this.certificate_form.certificate)
            this.runnersPlaza.postRecordCertificate(record.id, formData).then (() => {
              this.$router.replace ('/records/' + record.id + '/update')
            })
          } else {
            this.$router.replace ('/records/' + record.id + '/update')
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
    },
    handleFileUpload () {
      this.certificate_form.certificate = this.$refs.upload.files[0]
    },
  },
}
</script>
