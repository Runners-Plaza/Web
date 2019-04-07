<template>
    <v-list>
        <v-subheader>
            {{ $t ('latest_register_runner') }}
        </v-subheader>
        <v-list-tile v-for="(member, index) in members"
                     :key="index"
                     avatar>
            <v-list-tile-avatar>
                <img :src="member.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title @click="" v-html="member.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="member.time"></v-list-tile-sub-title>
                <v-list-tile-title @click="">{{ member.contestName }}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>
<script>
  export default {
  name: "latest-registered-runners-list",
  data () {
    return {
      members: [
       {
         name: 'Test',
         time: '6:00:00',
         contestName: 'Test3',
         avatar: null,
       },
      ],
    }
  },
  mounted () {
    this.updateList ()
  },
  methods: {
    async updateList () {
      this.members = [
       {
         name: 'Test',
         time: '6:01:00',
         contestName: 'Test3',
         avatar: 'https://s.gravatar.com/avatar/aee110cd7bc08cbbbee5bf2a143f5a50?s=80',
       },
       {
         name: 'Test',
         time: '6:02:00',
         contestName: 'Test3',
         avatar: 'https://s.gravatar.com/avatar/aee110cd7bc08cbbbee5bf2a143f5a50?s=80',
       },
       {
         name: 'Test',
         time: '6:03:00',
         contestName: 'Test3',
         avatar: 'https://s.gravatar.com/avatar/aee110cd7bc08cbbbee5bf2a143f5a50?s=80',
       },
      ]
    },
  },
}</script>
