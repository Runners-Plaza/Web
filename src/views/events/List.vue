<template>
  <v-container fluid>
    <v-btn color="blue lighten-3"
       to="/events/create"
       v-if="hasPermission (true)"
       v-text="$t ('contest.add')" />
    <v-layout column wrap>
      <v-data-table
        hide-actions
        :headers="headers"
        :items="events">
        <template slot="items" slot-scope="props">
          <tr @click="eventDetail (props.item.id)">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.organization }}</td>
            <td>{{ props.item.location }}</td>
            <td>{{ translatedRegion (props.item.region) }}</td>
            <td>{{ props.item.start_at }}</td>
            <td>{{ props.item.sign_start_at }}</td>
            <td>{{ props.item.sign_end_at }}</td>
            <td><v-icon v-show="props.item.iaaf">done</v-icon></td>
            <td><v-icon v-show="props.item.aims">done</v-icon></td>
            <td><v-icon v-show="props.item.measured">done</v-icon></td>
            <td><v-icon v-show="props.item.recordable">done</v-icon></td>
          </tr>
        </template>
      </v-data-table>
      <the-pagination />
    </v-layout>
  </v-container>
</template>

<script>
import ThePagination from '../../components/ThePagination'

export default {
  name: 'EventList',
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
      headers: [
        {
          text: this.translatedLabel ('contest_name'),
          align: 'left',
          sortable: false,
          value: 'name',
        },{
          text: this.translatedLabel ('organizer'),
          value: 'organizer',
        },{
          text: this.translatedLabel ('location'),
          value: 'location',
        },{
          text: this.translatedLabel ('region'),
          value: 'region',
        },{
          text: this.translatedLabel ('start_at'),
          value: 'start_at',
        },{
          text: this.translatedLabel ('sign_start_at'),
          value: 'sign_start_at',
        },{
          text: this.translatedLabel ('sign_end_at'),
          value: 'sign_end_at',
        },{
          text: this.translatedLabel ('iaaf'),
          value: 'iaaf',
        },{
          text: this.translatedLabel ('aims'),
          value: 'aims',
        },{
          text: this.translatedLabel ('measured'),
          value: 'measured',
        },{
          text: this.translatedLabel ('recordable'),
          value: 'recordable',
        },
      ],
      events: [],
    }
  },
  mounted () {
    this.updateEventList ()
  },
  methods: {
    translatedRegion (code) {
      return this.$t ('regions.' + code.toLowerCase ())
    },
    translatedLabel (code) {
      return this.$t (code)
    },
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
