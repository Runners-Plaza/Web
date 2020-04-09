<template>
  <v-container fluid>
    <v-btn color="blue lighten-3"
       to="/events"
       v-text="$t ('back_to.list')" />
    <v-btn color="blue lighten-3"
       v-show="hasPermission (true)"
       @click="updateEvent ()"
       v-text="$t ('contest.edit')" />
    <v-btn color="blue lighten-3"
       v-show="hasPermission (true)"
       @click="addDistance ()"
       v-text="$t ('distance.create')" />
    <v-btn
       v-show="records && records.length"
       color="blue lighten-3"
       @click="recordsList ()"
       v-text="$t ('contest.records')" />
    <v-layout column wrap>
      <v-list v-if="event">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="$t ('contest_name')" />
            <v-list-tile-title v-text="event.name" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="$t ('contest_english_name')" />
            <v-list-tile-title v-text="event.english_name" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="$t ('organizer')" />
            <v-list-tile-title v-text="event.organizer" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="$t ('english_organizer')" />
            <v-list-tile-title v-text="event.english_organizer" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="$t ('location')" />
            <v-list-tile-title v-text="event.location" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="$t ('english_location')" />
            <v-list-tile-title v-text="event.english_location" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="$t ('region')" />
            <v-list-tile-title v-text="regionLabels[event.region]" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="$t ('level')" />
            <v-list-tile-title v-text="levelLabels[event.level]" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="$t ('start_at')" />
            <v-list-tile-title v-text="event.start_at" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('sign_start_at')" />
            <v-list-tile-title v-text="event.sign_start_at" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="$t ('sign_end_at')" />
            <v-list-tile-title v-text="event.sign_end_at" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="$t ('link')" />
            <v-list-tile-title>
              <a target="_blank" :href="event.url" v-text="$t ('contest.link')"/>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="$t ('distance.list')" />
            <div v-if="event.distances.length != 0">
              <v-chip
                small
                @click="distanceDetail (distance.id)"
                v-for="distance in event.distances">
                {{ distance.name }}
              </v-chip>
            </div>
            <v-list-tile-title v-else v-text="$t ('none')" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-checkbox
            v-model="event.iaaf"
            readonly
            :label="$t ('iaaf')"/>
        </v-list-tile>
        <v-list-tile>
          <v-checkbox
            v-model="event.aims"
            readonly
            :label="$t ('aims')"/>
        </v-list-tile>
        <v-list-tile>
          <v-checkbox
            v-model="event.measured"
            readonly
            :label="$t ('measured')"/>
        </v-list-tile>
        <v-list-tile>
          <v-checkbox
            v-model="event.recordable"
            readonly
            :label="$t ('recordable')"/>
        </v-list-tile>
        <div v-if="hasPermission(true)">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('created_at')" />
              <v-list-tile-title v-text="event.created_at" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('updated_at')" />
              <v-list-tile-title v-text="event.updated_at" />
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'EventsDetail',
  data () {
    return {
      event: null,
      chosen_tab: 'detail',
      id: null,
      records: null,
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getThisEvent ()
  },
  computed: {
    levelLabels () {
      return {
        Activity: this.$t ('levels.activity'),
        Relay: this.$t ('levels.relay'),
        Trilathon: this.$t ('levels.trilathon'),
        LessThanTen: this.$t ('levels.less_than_ten'),
        TenToHalf: this.$t ('levels.ten_to_half'),
        Half: this.$t ('levels.half'),
        Full: this.$t ('levels.full'),
        Ultra: this.$t ('levels.ultra'),
      }
    },
    regionLabels () {
      return {
        Northern: this.$t ('regions.northern'),
        Central: this.$t ('regions.central'),
        Southern: this.$t ('regions.southern'),
        Eastern: this.$t ('regions.eastern'),
        Others: this.$t ('regions.others'),
      }
    },
  },
  methods: {
    recordsList () {
      this.$router.replace ('/events/' + this.id + '/records')
    },
    updateEvent () {
      this.$router.replace ('/events/' + this.id + '/update')
    },
    addDistance () {
      this.$router.replace ('/events/' + this.id + '/distances/create')
    },
    distanceDetail (id) {
      this.$router.replace ('/events/' + this.id + '/distances/' + id)
    },
    async getThisEvent () {
      this.event = await this.runnersPlaza.getEvent (this.id)
      this.records = await this.runnersPlaza.getRecordsOfEvent (this.id)
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
