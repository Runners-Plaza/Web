<template>
  <v-container fluid>
    <v-btn color="blue lighten-3"
       to="/events/create"
       v-if="me.show && me.can.manage"
       v-text="$t ('contest.add')" />
    <v-layout column wrap>
      <v-list three-line class="events">
        <template v-for="(event, index) in events">
          <v-list-tile
            :key="index"
            @click="eventDetail (event.id)"
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
</template>

<script>
import ThePagination from '../../components/ThePagination'

export default {
  name: 'EventIndex',
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
      this.events = await this.runnersPlaza.getEvents ()
    },
    eventDetail (id) {
      if (this.hasPermission (true)) {
        this.$router.replace ('/events/' + id + '/update')
      } else {
        this.$router.replace ('/events/' + id)
      }
    },
  },
}
</script>
