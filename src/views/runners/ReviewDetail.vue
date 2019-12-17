<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-btn color="blue lighten-3"
         to="/runners/review"
         v-text="$t ('back_to.list')" />
      <div v-if="ableToReview" v-show="hasPermission (true)">
        <v-btn color="blue lighten-3"
          @click="accept (runner)"
          v-text="$t ('accept')" />
        <v-btn
          color="error"
          @click="reject (runner)"
          v-text="$t ('reject')" />
      </div>
      <div v-else v-show="hasPermission (true)">
        <v-btn
          color="error"
          @click="pending (runner)"
          v-text="$t ('re_review')" />
      </div>
    </v-layout>
    <runner-detail :id="id" />
  </v-container>
</template>

<script>
import RunnerDetail from '../../components/runner/Detail.vue'

export default {
  name: 'RunnersDetail',
  components: {
    RunnerDetail,
  },
  data () {
    return {
      id: null,
      runner: null,
    }
  },
  created () {
    this.id = this.$route.params.id
    if (this.hasPermission (true)) {
      this.getThisRunner ()
    }
  },
  computed: {
    ableToReview () {
      return this.runner !== null && this.runner.status == 'Pending'
    },
  },
  methods: {
    accept () {
      this.runnersPlaza.acceptRunner (this.id).then (() => {
        this.getNextRunner ()
      })
    },
    reject () {
      this.runnersPlaza.rejectRunner (this.id).then (() => {
        this.getNextRunner ()
      })
    },
    pending () {
      this.runnersPlaza.pendingRunner (this.id).then (() => {
        this.getThisRunner ()
      })
    },
    getThisRunner () {
      this.runnersPlaza.getRunnerDetail(this.id).then ((runner) => {
        this.runner = runner
      })
    },
    getNextRunner () {
      this.runnersPlaza.getNextPendingRunner ().then ((runner) => {
        if (runner.length == 0) {
          this.$router.replace ({ name: 'runners' })
        } else {
          this.id = runner[0].id
        }
      })
    }
  },
}
</script>
