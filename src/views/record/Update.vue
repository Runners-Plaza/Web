<template>
  <v-container fluid v-if="record">
    <v-btn color="blue lighten-3"
       to="/runner/records"
       v-text="$t ('back_to.list')" />
    <v-layout row wrap>
      <v-flex md12 lg6>
        <v-list light>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('status')" />
              <v-list-tile-title v-text="$t (record.status)" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-show="record.status === 'Rejected'">
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('reason')" />
              <v-list-tile-title v-text="reason" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('contest_name')" />
              <v-list-tile-title v-text="record.event.name" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('distance.number')" />
              <v-list-tile-title v-text="record.distance.name" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('bib_number')" />
              <v-list-tile-title v-text="record.bib_number" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('group')" />
              <v-list-tile-title v-text="record.group" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('contest_complete_time')" />
              <v-list-tile-title v-text="contest_complete_time" />
            </v-list-tile-content>
          </v-list-tile>
          <v-form
            v-show="record.status === 'Pending'"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-list-tile v-show="record_certificate === false">
              <v-list-tile-content>
                <v-list-tile-sub-title v-text="$t ('certificate')" />
                <input
                  type="file"
                  ref="upload"
                  @change="handleFileUpload"
                />
              </v-list-tile-content>
            </v-list-tile>
            <v-btn
              v-show="record_certificate === false"
              block
              dark
              :disabled="!valid"
              color="blue lighten-3"
              @click="validate"
              v-text="$t ('submit')"
            >
              {{ $t ('submit') }}
            </v-btn>
          </v-form>
          <v-btn
            v-show="record.status !== 'Approved'"
            color="error"
            block
            dark
            @click="deleteRecord ()"
            v-text="$t ('delete')" />
        </v-list>
      </v-flex>
      <v-flex md12 lg6>
        <h3 align="center" v-if="record_certificate === null">
          {{ $t ('certificate_checking') }}
        </h3>
        <h3 align="center" v-else-if="record_certificate === false">
          {{ $t ('certificate_was_not_uploaded') }}
        </h3>
        <v-img
          v-else
          ref="preview"
          :src="record_certificate"
          class="certificate-img"
        ></v-img>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'RecordUpdate',
  data () {
    return {
      valid: false,
      id: null,
      record: null,
      reason: '',
      record_certificate: null,
      form: {
        certificate: null,
      },
    }
  },
  computed: {
    contest_complete_time () {
      let hours = Math.floor (this.record.time / 3600)
      let minutes = Math.floor ((this.record.time % 3600) / 60)
      let seconds = this.record.time % 60
      return hours + ':' + minutes + ':' + seconds
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.loadRecord ()
  },
  methods: {
    loadRecord () {
      this.runnersPlaza.getRecord(this.id).then ((record) => {
        this.record = record
        if (record.status === 'Rejected') {
          this.runnersPlaza.getRecordError(this.id).then ((reason) => {
            this.reason = reason.description
          })
        }
        this.runnersPlaza.getRecordCertificate(this.id).then ((certificate) => {
          if (certificate.error == undefined) {
            this.record_certificate = certificate
          } else {
            this.record_certificate = false
          }
        })
      })
    },
    submit () {
      let formData = new FormData()
      formData.append('certificate', this.form.certificate)
      this.runnersPlaza.postRecordCertificate(this.id, formData).then ((record) => {
        this.loadRecord ()
      })
    },
    deleteRecord () {
      if (confirm (this.$t ('record.delete_confirm'))) {
        this.runnersPlaza.deleteRecord(this.id).then ((record) => {
          this.$router.replace ('/runner/records')
        })
      }
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.submit()
      }
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    handleFileUpload () {
      this.form.certificate = this.$refs.upload.files[0]
    },
  },
}
</script>
