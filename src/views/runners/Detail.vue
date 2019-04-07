<template>
  <v-list v-if="runner">
    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-sub-title v-text="$t ('name')" />
        <v-list-tile-title v-text="runner.name" />
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-sub-title v-text="$t ('status')" />
        <v-list-tile-title v-text="$t (runner.status)" />
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-sub-title v-text="$t ('alternative_name')" />
        <v-list-tile-title v-text="runner.alternative_name" />
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-sub-title v-text="$t ('english_name')" />
        <v-list-tile-title v-text="runner.english_name" />
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-sub-title v-text="$t ('alternative_english_name')" />
        <v-list-tile-title v-text="runner.alternative_english_name" />
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-sub-title v-text="$t ('organization')" />
        <v-list-tile-title v-text="runner.organization" />
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-sub-title v-text="$t ('phone')" />
        <v-list-tile-title v-text="runner.phone" />
      </v-list-tile-content>
    </v-list-tile>
    <div v-if="ableToReview">
      <v-btn
        color="success"
        @click="accept (runner)"
      >
        {{ $t ('accept') }}
      </v-btn>

      <v-btn
        color="error"
        @click="reject (runner)"
      >
      {{ $t ('reject') }}
      </v-btn>
    </div>
    <div v-else>
      <v-btn
        color="error"
        @click="pending (runner)"
      >
      {{ $t ('re_review') }}
      </v-btn>
    </div>
  </v-list>
</template>

<script>
export default {
  name: 'RunnerDetail',
  data () {
    return {
      runner: null
    }
  },
  computed: {
    ableToReview () {
      return this.runner.status == 'Pending'
    },
  },
  created () {
    this.getThisRunner ()
  },
  methods: {
    getThisRunner () {
      this.runnersPlaza.getRunnerDetail(this.$route.params.id).then ((runner) => {
        this.runner = runner
      })
    },
    accept () {
      this.runnersPlaza.acceptRunner (this.runner.id).then (() => {
        this.getNextRunner ()
      })
    },
    reject () {
      this.runnersPlaza.rejectRunner (this.runner.id).then (() => {
        this.getNextRunner ()
      })
    },
    pending () {
      this.runnersPlaza.pendingRunner (this.runner.id).then (() => {
        this.getThisRunner ()
      })
    },
    getNextRunner () {
      this.runnersPlaza.getNextPendingRunner ().then ((runner) => {
        if (runner.length == 0) {
          this.$router.replace ({ name: 'runners' })
        } else {
          this.runner = runner[0]
        }
      })
    }
  },
}
</script>
