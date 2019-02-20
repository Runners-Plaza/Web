<template>
  <v-navigation-drawer
    clipped
    enable-resize-watcher
    fixed
    app
    v-model="sidebar.show"
  >
    <v-list>
      <div
        v-for="(item, i) in items"
        :key="i"
        :class="{'teal--text': $route.name === item.to}"
      >
        <v-list-group v-if="item.subItems" no-action>
          <v-list-tile slot="activator">
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="(subItem, j) in item.subItems"
            :key="j"
            @click="clickOn (subItem)"
           >
            <v-list-tile-action>
              <v-icon v-html="subItem.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="subItem.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile 
          v-else
          @click="clickOn (item)"
         >
        <v-list-tile-action>
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile-content>
        </v-list-tile>
      </div>
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
        name: "marathon_survey",
        icon: "assignment",
        title: this.$t ('marathon_survey.index'),
        to: "marathon_survey_index",
        subItems: [
           {
             name: "runner_information",
             icon: "directions_run",
             title: this.$t('runner_information'),
             to: "",
           },
           {
             name: "register_record",
             icon: "event_available",
             title: this.$t('register_record'),
             to: "",
           },
         ],
      })
    if (this.me.position === 'Manager') {
      items[items.length -1].subItems.push({
             name: "runner_review",
             icon: "directions_run",
             title: this.$t('review_runner'),
             to: "",
           },
           {
             name: "record_review",
             icon: "event_available",
             title: this.$t('review_record'),
             to: "",
      })
    }
      items.push({
        name: "grade_report",
        icon: "list_alt",
        title: this.$t ('grade_report'),
        to: "",
      });
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
