<template>
  <div>
    <v-list three-line class="records">
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
  </div>
</template>

<script>
import ThePagination from '../../components/ThePagination'

export default {
  name: 'Records',
  components: {
    ThePagination,
  },
  provide () {
    return {
      changePage: this.updateRecordList,
    }
  },
  data () {
    return {
      records: null,
    }
  },
  mounted () {
    this.updateRecordList ()
  },
  methods: {
    formattedTime (time) {
      let hours = Math.floor (time / 3600)
      let minutes = Math.floor ((time % 3600) / 60)
      let seconds = time % 60
      return hours + ':' + minutes + ':' + seconds
    },
    updateRecordList () {
      this.runnersPlaza.getMyRecords().then ((records) => {
        this.records = records
      })
    },
    recordDetail (id) {
      if (this.hasPermission (true)) {
        this.$router.replace ('/records/' + id + '/update')
      } else {
        this.$router.replace ('/records/' + id)
      }
    },
  },
}
</script>

<style scoped>
.records {
  background: inherit
}
</style>
