<template>
  <v-container fluid>
    <v-layout column wrap>
      <v-list three-line>
        <template v-for="(event, index) in events">
          <v-list-tile
            :key="index"
            @click="registerRecord (event.id)"
          >
            <v-list-tile-content>
              <v-list-tile-title v-html="event.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="event.organizer"></v-list-tile-sub-title>
              <v-list-tile-sub-title v-html="event.location"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <the-pagination />
      </v-list>
    </v-layout>
  </v-container>

  </div>
</template>

<script>
import ThePagination from '../../components/ThePagination'

export default {
  name: 'RunnerRegisterRecordIndex',
  components: {
    ThePagination,
  },
  provide () {
    return {
      changePage: this.updateEventList,
    }
  },
  data () {
    return {
      events: null,
    }
  },
  mounted () {
    this.updateEventList ()
  },
  methods: {
    async updateEventList () {
      this.events = await this.runnersPlaza.getRecordableEvents ()
    },
    registerRecord (id) {
      this.$router.replace ('/runner/register_record/' + id)
    },
  },
}
</script>
