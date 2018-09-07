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
        @click="clickOn(item)"
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
  name: 'the-sidebar',
  data () {
    return {
      items: [
        {
          name: 'home',
          icon: 'home',
          title: 'Home',
          to: 'home'
        }
      ]
    }
  },
  methods: {
    clickOn (item) {
      if (item.name === 'log out')
        this.logout()
      else
        this.$router.replace({ name: item.to })
    }
  }
}
</script>
