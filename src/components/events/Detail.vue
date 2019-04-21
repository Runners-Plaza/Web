<template>
  <div class="event">
    <v-tabs
      slider-color="blue"
      centered
      v-model="chosen_tab"
    >
      <v-tab :href="`#detail`">
        {{ $t ('contest.detail') }}
      </v-tab>
      <v-tab :href="`#distances`">
        {{ $t ('contest.distances') }}
      </v-tab>
      <v-tab :href="`#records`">
        {{ $t ('contest.records') }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="chosen_tab">
      <v-tab-item :value="`detail`">
        <v-list v-if="event">
          <h3 align="center">{{ $t ('contest.detail') }}</h3>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('name')" />
              <v-list-tile-title v-text="event.name" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('contest_english_name')" />
              <v-list-tile-title v-text="event.english_name" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('organizer')" />
              <v-list-tile-title v-text="event.organizer" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('english_organizer')" />
              <v-list-tile-title v-text="event.english_organizer" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('location')" />
              <v-list-tile-title v-text="event.location" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('english_location')" />
              <v-list-tile-title v-text="event.english_location" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('region')" />
              <v-list-tile-title v-text="event.region" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('start_at')" />
              <v-list-tile-title v-text="event.start_at" />
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title v-text="$t ('sign_start_at')" />
              <v-list-tile-title v-text="event.sign_start_at" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title v-text="$t ('sign_end_at')" />
              <v-list-tile-title v-text="event.sign_end_at" />
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-checkbox
              v-model="event.iaaf"
              disabled
              :label="$t ('iaaf')"/>
          </v-list-tile>
          <v-list-tile>
            <v-checkbox
              v-model="event.aims"
              disabled
              :label="$t ('aims')"/>
          </v-list-tile>
          <v-list-tile>
            <v-checkbox
              v-model="event.measured"
              disabled
              :label="$t ('measured')"/>
          </v-list-tile>
          <v-list-tile>
            <v-checkbox
              v-model="event.recordable"
              disabled
              :label="$t ('recordable')"/>
          </v-list-tile>
        </v-list>
      </v-tab-item>
      <v-tab-item :value="`distances`">
        To be announced
      </v-tab-item>
      <v-tab-item :value="`records`">
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: 'EventDetail',
  data () {
    return {
      event: null,
      chosen_tab: 'detail',
    }
  },
  created () {
    this.getThisEvent ()
  },
  methods: {
    getThisEvent () {
      this.runnersPlaza.getEvent(this.$route.params.id).then ((event) => {
        this.event = event
      })
    },
  },
}
</script>

<style scoped>
.event {
  background: inherit
}
</style>
