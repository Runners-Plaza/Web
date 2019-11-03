<template>
  <v-list v-if="distance" class="distance-detail">
    <v-btn color="blue lighten-3"
       @click="backToDetail ()"
       v-text="$t ('back_to.list')" />
    <v-list-tile>
      <v-list-tile-content>
	<v-list-tile-sub-title v-text="$t ('distance.name')" />
	<v-list-tile-title v-text="distance.name" />
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>
	<v-list-tile-sub-title v-text="$t ('distance.number')" />
	<v-list-tile-title v-text="distance.distance" />
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
	<v-list-tile-sub-title v-text="$t ('distance.runner_time_limit')" />
	<v-list-tile-title v-text="distance.runner_time_limit" />
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
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
  },
}
</script>

<style>
.distance-detail {
  background: inherit
}
</style>
