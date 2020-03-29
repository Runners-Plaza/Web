<template>
  <v-layout column wrap>
    <v-subheader v-text="$t ('statistics.index')" />
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t ('statistics.total_people_count') }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ statistics.people_count + $t ('people') }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t ('statistics.total_data_count') }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ statistics.data_count + $t ('records') }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t ('statistics.average_complete_times') }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ averageCompleteTimes + ' ' + $t ('times') }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t ('statistics.total_contest_count') }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ statistics.contest_count + $t ('records') }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-layout>
</template>

<script>
export default {
  name: "survey-statistics-list",
  data () {
    return {
      statistics: {
        people_count: 0,
        data_count: 0,
        contest_count: 0,
      },
    }
  },
  computed: {
    averageCompleteTimes () {
      if (this.statistics.people_count == 0) {
        return 0
      } else {
        return this.statistics.data_count / this.statistics.people_count
      }
    },
  },
  mounted () {
    this.updateStatistics ()
  },
  methods: {
    async updateStatistics () {
      this.runnersPlaza.getRunners ('approved').then (runners => {
        this.statistics.people_count = runners.length
      })
      this.runnersPlaza.getRecords ('approved').then (records => {
        this.statistics.data_count = records.length
      })
      this.runnersPlaza.getRecordableEvents ().then (events => {
        this.statistics.contest_count = events.length
      })
    }
  },
}
</script>
