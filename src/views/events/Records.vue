<template>
  <v-container fluid>
    <v-btn color="blue lighten-3"
       @click="backToDetail ()"
       v-text="$t ('back_to.previous_page')" />
    <v-layout column wrap>
      <v-list three-line>
        <template v-for="(record, index) in records">
          <v-list-tile
            :key="index"
            @click="recordDetail (record.id)"
          >
            <v-list-tile-content>
              <v-list-tile-title v-html="record.runner.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="record.distance.name"></v-list-tile-sub-title>
              <v-list-tile-sub-title v-html="formattedTime (record.time)"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <the-pagination />
      </v-list>
    </v-layout>
  </v-container>
</template>

<script>
import ThePagination from '../../components/ThePagination'

export default {
  name: 'EventsRecords',
  components: {
    ThePagination,
  },
  provide () {
    return {
      changePage: this.getRecords,
    }
  },
  data () {
    return {
      id: null,
      records: null,
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getRecords ()
  },
  methods: {
    formattedTime (time) {
      let hours = Math.floor (time / 3600)
      let minutes = Math.floor ((time % 3600) / 60)
      let seconds = time % 60
      return hours + ':' + minutes + ':' + seconds
    },
    async getRecords () {
      this.records = await this.runnersPlaza.getRecordsOfEvent (this.id)
    },
    backToDetail () {
      this.$router.replace ('/events/' + this.id)
    },
    recordDetail (id) {
      this.$router.replace ('/events/' + this.id + '/records/' + id)
    },
  },
}
</script>
