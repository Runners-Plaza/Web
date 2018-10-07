<template>
  <v-toolbar
    color="teal"
    dark
    clipped-left
    app
  >
    <v-toolbar-side-icon
      @click.stop="sidebar.show = !sidebar.show"
    >
    </v-toolbar-side-icon>
    <v-toolbar-title v-text="title"></v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu>
      <v-toolbar-title slot="activator">
        <v-icon>language</v-icon>
      </v-toolbar-title>
      <v-list>
        <v-list-tile
          v-for="language in languages"
          :key="language.id"
          @click="changeLanguage (language)"
        >
          <v-list-tile-title v-text="language.name"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
const titles = {
  users: 'users',
  profile: 'my.profile',
}

export default {
  name: 'the-toolbar',
  computed: {
    title () {
      let title = titles[this.$route.name]
      if (title) {
        return this.$t (title)
      }
      return this.$t ('runners_plaza')
    },
    lanauages () {
      return this.lanauages
    },
  },
  methods: {
    changeLanguage (language) {
      this.$i18n.locale = language.id
      this.$cookie.set ('language', language.id, '1')
      this.toaster.success (this.$t ('changed'))
    },
  },
}
</script>
