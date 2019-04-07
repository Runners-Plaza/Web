<template>
  <div>
    <v-subheader>
      {{ $t ('contest.list') }}
    </v-subheader>
    <v-btn color="success"
       to="create"
       v-if="me.show && me.can.manage"
       v-text="$t ('contest.add')" />
    <v-container fluid>
      <v-layout row wrap>
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
    </v-container>

    <v-list three-line>
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
  </div>
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
    updateEventList () {
      this.runnersPlaza.getEvents().then ((events) => {
        this.events = events
      })
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
