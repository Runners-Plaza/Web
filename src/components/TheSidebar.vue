<template>
  <v-navigation-drawer
    clipped
    enable-resize-watcher
    fixed
    app
    v-model="sidebar.show"
  >
    <v-list>
      <v-list-tile v-if="me.show">
        <v-list-tile-content>
          <v-list-tile-title v-text="me.name"></v-list-tile-title>
          <v-list-tile-sub-title v-text="me.email"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider v-if="me.show" />
      <v-list-tile
        v-for="(item, i) in items"
        :key="i"
        @click="clickOn (item)"
        :class="{'teal--text': $route.name === item.to}"
      >
        <v-list-tile-action>
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "the-sidebar",
  computed: {
    items () {
      let items = []
      if (this.me.show) {
        items.push ({
          name: "home",
          icon: "home",
          title: this.$t ('home'),
          to: "home",
        }, {
          name: "profile",
          icon: "account_box",
          title: "My Profile",
          to: "profile",
        })
        if (this.me.position === 'Manager') {
          items.push ({
            name: "users",
            icon: "people",
            title: "Users",
            to: "users",
          })
        }
        items.push ({
          name: "log out",
          icon: "exit_to_app",
          title: this.$t ('log.out'),
          to: "",
        })
      } else {
        items.push ({
          name: "log in",
          icon: "perm_identity",
          title: this.$t ('log.in'),
          to: "login",
        })
      }
      return items
    },
  },
  methods: {
    clickOn (item) {
      if (item.name === "log out") {
        this.logout ().then (() => {
          this.toaster.success (this.$t ('logout.success'))
        })
      } else {
        this.$router.replace ({ name: item.to })
      }
    },
  },
}
</script>
