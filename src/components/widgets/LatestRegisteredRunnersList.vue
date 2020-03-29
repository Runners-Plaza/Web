<template>
  <v-layout column wrap>
    <v-list v-show="members">
      <v-subheader v-text="$t ('latest_register_runner')" />
      <v-list-tile
        v-for="(member, index) in members"
        :key="index"
        avatar>
        <v-list-tile-avatar>
          <v-icon>person</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title @click="" v-html="member.name" />
          <v-list-tile-sub-title v-html="member.created_at" />
          <v-list-tile-sub-title v-html="member.organization" />
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-layout>
</template>

<script>
  export default {
  name: "latest-registered-runners-list",
  data () {
    return {
      members: null,
    }
  },
  mounted () {
    this.updateList ()
  },
  methods: {
    async updateList () {
      this.members = await this.runnersPlaza.getRunners ('approved')
    },
  },
}
</script>
