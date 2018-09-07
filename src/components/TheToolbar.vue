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
  </v-toolbar>
</template>

<script>
const titles = {}

export default {
  name: 'the-toolbar',
  computed: {
    title () {
      var title = titles[this.$route.name]
      if (title)
        return title
      return 'Runner\'s Plaza'
    }
  }
}
</script>
