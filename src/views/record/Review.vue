<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <v-select :items="statusLabels" item-text="text" item-value="status" v-model="status" @input="getRecords()"/>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field
          flat
          :label="$t ('name')"
          prepend-inner-icon="search" />
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field
          flat
          :label="$t ('organization')"
          prepend-inner-icon="search" />
      </v-flex>
    </v-layout>
    <v-layout column wrap>
      <v-list three-line>
        <template v-for="(record, index) in records">
          <v-list-tile
            :key="index"
            @click="recordDetail (record.id)"
          >
            <v-list-tile-content>
              <v-list-tile-title v-html="record.event.name"></v-list-tile-title>
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
  name: 'RecordsReview',
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
      records: null,
      status: 'Pending',
    }
  },
  mounted () {
    this.getRecords ()
  },
  computed: {
    statusLabels () {
      return [
        {
          status: 'Pending',
          text: this.$t ('Pending'),
        },
        {
          status: 'Rejected',
          text: this.$t ('Rejected'),
        },
        {
          status: 'Approved',
          text: this.$t ('Approved'),
        },
      ]
    },
  },
  methods: {
    formattedTime (time) {
      let hours = Math.floor (time / 3600)
      let minutes = Math.floor ((time % 3600) / 60)
      let seconds = time % 60
      return hours + ':' + minutes + ':' + seconds
    },
    getRecords () {
      this.runnersPlaza.getRecords(this.status).then ((records) => {
        this.records = records
      })
    },
    recordDetail (id) {
      if (this.hasPermission (true)) {
        this.$router.replace ('/records/' + id + '/review')
      } else {
        this.$router.replace ('/records/' + id)
      }
    },
  },
}
</script>
