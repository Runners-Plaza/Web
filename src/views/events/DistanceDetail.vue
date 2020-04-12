<template>
  <v-container fluid>
    <v-btn color="blue lighten-3"
       @click="backToDetail ()"
       v-text="$t ('back_to.list')" />
    <v-btn color="blue lighten-3"
       v-show="hasPermission (true)"
       @click="updateDistance ()"
       v-text="$t ('distance.update')" />
    <v-layout column wrap>
      <v-list v-if="distance" class="distance-detail">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="$t ('distance.name')" />
            <v-list-tile-title v-text="distance.name" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="$t ('distance.number')" />
            <v-list-tile-title v-text="distance.distance / 1000 + $t ('kilometer')" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="$t ('distance.cost')" />
            <v-list-tile-title v-text="distance.cost" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="$t ('distance.time_limit')" />
            <v-list-tile-title v-text="distance.time_limit" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="$t ('distance.runner_limit')" />
            <v-list-tile-title v-text="distance.runner_limit" />
          </v-list-tile-content>
        </v-list-tile>
        <div v-if="hasPermission(true)">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('created_at')" />
              <v-list-tile-title v-text="distance.created_at" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('updated_at')" />
              <v-list-tile-title v-text="distance.updated_at" />
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'EventsDistanceDetail',
  data () {
    return {
      distance: null,
      id: null,
      distanceId: null,
    }
  },
  created () {
    this.id = this.$route.params.id
    this.distanceId = this.$route.params.distanceId
    this.runnersPlaza.getDistance (this.distanceId).then ((distance) => {
      this.distance = distance
    })
  },
  methods: {
    backToDetail () {
      this.$router.replace ('/events/' + this.id)
    },
    updateDistance () {
      this.$router.replace ('/events/' + this.id + '/distances/' + this.distanceId + '/update')
    },
  },
}
</script>
