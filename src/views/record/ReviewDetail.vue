<template>
  <div class="profile ma-3" v-show="record">
    <v-btn color="blue lighten-3"
       to="/records/review"
       v-text="$t ('back_to.list')" />
    <v-container fluid>
      <v-layout row wrap>
        <v-flex md12 lg4>
          <v-list>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title v-text="$t ('status')" />
                <v-list-tile-title v-text="$t (record.status)" />
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-show="reason">
              <v-list-tile-content>
                <v-list-tile-sub-title v-text="$t ('reason')" />
                <v-list-tile-title v-text="$t (reason)" />
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
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title v-text="$t ('contest_chip_time')" />
                <v-list-tile-title v-text="contest_chip_time" />
              </v-list-tile-content>
            </v-list-tile>
            <div v-if="ableToReview">
              <v-list-tile>
                <v-text-field
                  v-model="newReason"
                  :rules="stringRules"
                  :label="$t ('reason')"
                  required
                ></v-text-field>
              </v-list-tile>
              <v-btn
                color="blue lighten-3"
                dark
                @click="accept ()"
              >
                {{ $t ('accept') }}
              </v-btn>

              <v-btn
                color="error"
                dark
                @click="reject ()"
              >
              {{ $t ('reject') }}
              </v-btn>
            </div>
            <div v-else>
              <v-btn
                color="error"
                dark
                @click="pending ()"
              >
              {{ $t ('re_review') }}
              </v-btn>
            </div>
          </v-list>
        </v-flex>
        <v-flex md12 lg8>
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
            class="img"
          ></v-img>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'RecordReviewDetail',
  data () {
    return {
      id: null,
      record: null,
      record_certificate: null,
      reason: '',
      newReason: '',
      stringRules: [
        v => !!v || 'This field is required',
        v => (v && v.length <= 100) || 'Name must be less than 100 characters'
      ],
    }
  },
  computed: {
    ableToReview () {
      return this.record !== null && this.record.status === 'Pending'
    },
    contest_complete_time () {
      let hours = Math.floor (this.record.time / 3600)
      let minutes = Math.floor ((this.record.time % 3600) / 60)
      let seconds = this.record.time % 60
      return hours + ':' + minutes + ':' + seconds
    },
    contest_chip_time () {
      let hours = Math.floor (this.record.chip_time / 3600)
      let minutes = Math.floor ((this.record.chip_time % 3600) / 60)
      let seconds = this.record.chip_time % 60
      return hours + ':' + minutes + ':' + seconds
    },
  },
  mounted () {
    this.id = this.$route.params.id
    this.getThisRecord ()
  },
  methods: {
    getThisRecord () {
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
    accept () {
      this.runnersPlaza.acceptRecord (this.record.id).then (() => {
        this.record_certificate = null
        this.getNextRecord ()
      })
    },
    reject () {
      this.runnersPlaza.rejectRecord (this.record.id, this.newReason).then (() => {
        this.record_certificate = null
        this.getNextRecord ()
      })
    },
    pending () {
      this.runnersPlaza.pendingRecord (this.record.id, '').then (() => {
        this.getThisRecord ()
      })
    },
    getNextRecord () {
      this.runnersPlaza.getNextPendingRecord ().then ((record) => {
        if (record.length == 0) {
          this.$router.replace ({ name: 'records_review' })
        } else {
          this.id = record[0].id
          this.getThisRecord ()
        }
      })
    },
  },
}
</script>

<style>
.profile {
  background: inherit
}

.img {
  width: 100%;
}
</style>
