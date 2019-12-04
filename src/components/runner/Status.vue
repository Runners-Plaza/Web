<template>
  <v-layout column wrap>
    <v-list v-if="runner">
      <h3 align="center">{{ $t ('runner.application_status') }}</h3>
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
      <v-btn
        color="error"
        @click="deleteApplication"
      >
        {{ $t ('runner.delete_application') }}
      </v-btn>
    </v-list>
  </v-layout>
</template>

<script>

export default {
  name: 'runner-status',
  inject: [
    'updateStatus',
  ],
  data () {
    return {
      runner: null,
    }
  },
  mounted () {
    this.runnersPlaza.getRunner().then ((runner) => {
      this.runner = runner
    })
  },
  methods: {
    deleteApplication () {
      this.runnersPlaza.deleteRunner().then ((runner) => {
        this.updateStatus ()
      })
    },
  },
}
</script>
