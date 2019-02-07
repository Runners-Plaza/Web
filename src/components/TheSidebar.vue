<template>
  <v-navigation-drawer
    clipped
    enable-resize-watcher
    fixed
    app
    v-model="sidebar.show"
  >
    <v-list>
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
      items.push ({
        name: "home",
        icon: "home",
        title: this.$t ('home'),
        to: "home",
      },{
        name: "news",
        icon: "announcement",
        title: this.$t ('news'),
        to: "",
      },{
        name: "contest",
        icon: "event",
        title: this.$t ('contest'),
        to: "",
      },{
        name: "forum",
        icon: "view_headline",
        title: this.$t ('forum'),
        to: "",
      },{
        name: "marathon_survey",
        icon: "assignment",
        title: this.$t ('marathon_survey.index'),
        to: "marathon_survey_index",
      },{
        name: "grade_report",
        icon: "list_alt",
        title: this.$t ('grade_report'),
        to: "",
      })
//    if (this.me.position === 'Manager') {}
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
