<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-select :items="statusLabels" item-text="text" item-value="status" v-model="status" @input="getRunners()"/>
    </v-layout>
    <v-layout column wrap>
      <v-list three-line>
        <template v-for="(runner, index) in runners">
          <v-list-tile
            :key="index"
            @click="runnerInfo (runner.id)"
          >
            <v-list-tile-content>
              <v-list-tile-title v-html="runner.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="runner.birthday"></v-list-tile-sub-title>
              <v-list-tile-sub-title v-html="runner.organization"></v-list-tile-sub-title>
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
  name: 'RunnerIndex',
  components: {
    ThePagination,
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
  provide () {
    return {
      changePage: this.getRunners,
    }
  },
  data () {
    return {
      status: 'Pending',
      runners: null,
    }
  },
  created () {
    this.getRunners ()
  },
  methods: {
    async getRunners () {
      this.runners = await this.runnersPlaza.getRunners(this.status)
    },
    runnerInfo (id) {
      this.$router.replace ('runners/' + id)
    },
  },
}
</script>
