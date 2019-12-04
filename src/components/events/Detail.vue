<template>
  <v-layout column wrap>
    <v-tabs
      slider-color="blue"
      centered
      v-model="chosen_tab">
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
        <v-list v-if="event">
          <h3 align="center">{{ $t ('contest.detail') }}</h3>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('name')" />
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
              <v-list-tile-title v-text="event.region" />
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
        </v-list>
      </v-tab-item>
      <v-tab-item v-if="distances" :value="`distances`">
        <v-list three-line>
          <v-list-tile
            v-for="(distance, index) in distances"
            @click="distanceDetail (distance.id)"
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
</template>

<script>
export default {
  name: 'EventDetail',
  data () {
    return {
      event: null,
      chosen_tab: 'detail',
      id: null,
      distances: null,
      records: null,
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getThisEvent ()
  },
  methods: {
    getThisEvent () {
      this.runnersPlaza.getEvent(this.id).then ((event) => {
        this.event = event
      })
      this.runnersPlaza.getDistances (this.id).then (distances => {
        this.distances = distances
      })
      this.runnersPlaza.getRecordsOfEvent (this.id).then (records => {
        this.records = records
      })
    },
    distanceDetail (id) {
      this.$router.replace ('/events/' + this.id + '/distances/' + id)
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
