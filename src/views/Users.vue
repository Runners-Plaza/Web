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
              @click="changePosition(user, position.name)"
            >
              <v-list-tile-action>
                <v-icon v-text="position.icon"></v-icon>
              </v-list-tile-action>
              <v-list-tile-title v-text="position.name"></v-list-tile-title>
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
  data () {
    return {
      users: [],
      icons: {
        Manager: 'settings',
        Member: 'person',
      },
      positions: [
        {
          name: 'Manager',
          icon: 'settings',
        },{
          name: 'Member',
          icon: 'person',
        },
      ],
    }
  },
  created () {
    this.runnersPlaza.getUsers ().then (users => {
      this.users = users
    })
  },
  methods: {
    changePosition (user, position) {
      let newUser = Object.assign ({}, user)
      newUser.position = position
      this.runnersPlaza.patchUser (newUser).then (newUser => {
        Object.assign (user, newUser)
        this.toaster.success ('Change successfully.')
      })
    }
  },
}
</script>

<style scoped>
.users {
  background: inherit
}
</style>
