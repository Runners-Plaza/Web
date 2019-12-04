<template>
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
        class="certificate_image"
      ></v-img>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'records-detail',
  props: [
    'id',
  ],
  data () {
    return {
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
  },
}
</script>
