<template>
    <v-list class="runner-honor-roll">
        <v-subheader>
            {{ $t ('runners_honor_roll') }}
        </v-subheader>
        <v-list-tile v-for="(member, index) in members"
                     :key="index"
                     avatar>
            <v-list-tile-avatar>
                <img :src="member.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title> {{ member.complete_count + $t ('times') }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-content>
                <v-list-tile-title @click="" v-html="member.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="member.organization"></v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ member.category + $t ('group') }}</v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>
<script>
  export default {
  name: "runners-honor-roll",
  data () {
    return {
      members: [
       {
         name: 'Test',
         complete_count: '99',
         organization: 'Test3',
         category: '60+',
         avatar: null,
       },
      ],
      count_select_list: [
        300,
        200,
        100,
        90,
        60,
        50,
        40,
        30,
        20,
        10,
        1,
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
         complete_count: '100',
         organization: 'Test3',
         category: '60+',
         avatar: 'https://s.gravatar.com/avatar/aee110cd7bc08cbbbee5bf2a143f5a50?s=80',
       },
       {
         name: 'Test',
         complete_count: '99',
         organization: 'Test3',
         category: '60+',
         avatar: 'https://s.gravatar.com/avatar/aee110cd7bc08cbbbee5bf2a143f5a50?s=80',
       },
       {
         name: 'Test',
         complete_count: '98',
         organization: 'Test3',
         category: '60+',
         avatar: 'https://s.gravatar.com/avatar/aee110cd7bc08cbbbee5bf2a143f5a50?s=80',
       },
      ]
    },
  },
}
</script>

<style scoped>
.runner-honor-roll {
  background: inherit
}
</style>
