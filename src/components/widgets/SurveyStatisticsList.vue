<template>
  <v-list class="survey-statistics-list">
    <v-subheader>
      {{ $t ('statistics.index') }}
    </v-subheader>

    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t ('statistics.total_people_count') }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ statistics.people_count + $t ('person') }}</v-list-tile-sub-title>
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
        <v-list-tile-sub-title>{{ statistics.average_complete_times + ' ' + $t ('times') }}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t ('statistics.total_contest_count') }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ statistics.contest_count + $t ('records') }}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: "survey-statistics-list",
  data () {
    return {
      statistics: {
        people_count: 0,
        data_count: 0,
        average_complete_times: 0,
        contest_count: 0,
      },
    }
  },
  mounted () {
    this.updateStatistics ()
  },
  methods: {
    async updateStatistics () {
      this.statistics = {
        people_count: 21238,
        data_count: 489186,
        average_complete_times: 23.03,
        contest_count: 3562,
      }
    },
  },
}
</script>

<style scoped>
.survey-statistics-list {
  background: inherit
}
</style>
