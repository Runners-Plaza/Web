<template>
  <v-layout row wrap>
    <v-subheader v-text="$t ('runners_list')" />
  </v-layout>
  <v-layout row wrap>
	  <v-flex xs12 sm6>
      <v-text-field
        flat
        :label="$t ('name')"
        prepend-inner-icon="search" />
    </v-flex>
    <v-flex xs12 sm6>
      <v-text-field
        flat
        :label="$t ('organization')"
        prepend-inner-icon="search" />
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs12 sm12>
      <v-select :items="count_select_list" :label="$t ('complete_count')" />
    </v-flex>
  </v-layout>
  <v-layout column wrap>
    <v-list>
      <v-list-tile
        v-for="(member, index) in members"
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
  </v-layout>
</template>

<script>
export default {
  name: "record-list",
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
