<template>
  <v-layout column wrap v-if="runner">
    <v-tabs
      slider-color="blue"
      centered
      v-model="chosen_tab">
      <v-tab :href="`#detail`">
        {{ $t ('runner.detail') }}
      </v-tab>
      <v-tab :href="`#records`">
        {{ $t ('runner.records') }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="chosen_tab">
      <v-tab-item :value="`detail`">
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('name')" />
              <v-list-tile-title v-text="runner.name" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="hasPermission (true)">
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
          <div v-if="hasPermission(true)">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title v-text="$t ('created_at')" />
                <v-list-tile-title v-text="runner.created_at" />
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title v-text="$t ('updated_at')" />
                <v-list-tile-title v-text="runner.updated_at" />
              </v-list-tile-content>
            </v-list-tile>
          </div>
        </v-list>
      </v-tab-item>
      <v-tab-item :value="`records`">
        <v-list three-line>
          <v-list-tile
            v-for="(record, index) in records"
            @click="recordDetail (record.id)"
            :key="index">
            <v-list-tile-content>
              <v-list-tile-title v-html="record.distance.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="formattedTime (record.time)"></v-list-tile-sub-title>
              <v-list-tile-title v-html="record.runner.name"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-tab-item>
    </v-tabs-items>
  </v-layout>
</template>

<script>
export default {
  name: 'runner-detail',
  props: [
    'id',
  ],
  data () {
    return {
      runner: null,
      chosen_tab: 'detail',
      records: null,
    }
  },
  mounted () {
    this.getThisRunner ()
  },
  methods: {
    getThisRunner () {
      this.runnersPlaza.getRunnerDetail(this.id).then ((runner) => {
        this.runner = runner
      })
      this.runnersPlaza.getRecordsOfRunner (this.id).then (records => {
        this.records = records
      })
    },
    recordDetail (id) {
      this.$router.replace ('/runners/' + this.id + '/records/' + id)
    },
    formattedTime (time) {
      let hours = Math.floor (time / 3600)
      let minutes = Math.floor ((time % 3600) / 60)
      let seconds = time % 60
      return hours + ':' + minutes + ':' + seconds
    },
  },
  watch: {
    id () {
      this.getThisRunner ()
    },
  },
}
</script>
