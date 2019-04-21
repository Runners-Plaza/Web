<template>
  <div class="register-record">
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
    updateEventList () {
      this.runnersPlaza.getRecordableEvents ().then ((events) => {
        this.events = events
      })
    },
    registerRecord (id) {
      this.$router.replace ('/runner/register_record/' + id)
    },
  },
}
</script>

<style scoped>
.register-record {
  background: inherit
}
</style>
