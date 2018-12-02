<template>
    <v-list class="users">
      <v-list-tile
        v-for="user in users"
        :key="user.id"
      >
        <v-list-tile-content>
          <v-list-tile-title v-text="user.name"></v-list-tile-title>
          <v-list-tile-sub-title v-text="user.email"></v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-menu offset-y>
            <v-btn slot="activator" flat>
              <v-icon v-text="icons[user.position]"></v-icon>
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile
                v-for="(position, i) in positions"
                :key="i"
                @click="changePosition (user, position.name)"
              >
                <v-list-tile-action>
                  <v-icon v-text="position.icon"></v-icon>
                </v-list-tile-action>
                <v-list-tile-title v-text="$t (position.label)"></v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
</template>

<script>
export default {
  name: 'users',
  inject: [
    'changePaging',
  ],
  props: [
    'reloadView',
  ],
  data () {
    return {
      users: [],
      icons: {
        Manager: 'settings',
        Member: 'person',
      },
      positions: [
        {
          label: 'manager',
          name: 'Manager',
          icon: 'settings',
        },{
          label: 'member',
          name: 'Member',
          icon: 'person',
        },
      ],
    }
  },
  created () {
    this.getUsers ()
  },
  methods: {
    async getUsers () {
      await this.runnersPlaza.getUsers ().then (users => {
        this.changePaging ()
        this.users = users
      })
    },
    changePosition (user, position) {
      let newUser = Object.assign ({}, user)
      newUser.position = position
      this.runnersPlaza.patchUser (newUser).then (newUser => {
        Object.assign (user, newUser)
      })
    },
  },
  watch: {
    reloadView () {
      this.getUsers ()
    },
  },
}
</script>

<style scoped>
.users {
  background: inherit
}
</style>
