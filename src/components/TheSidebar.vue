<template>
  <v-navigation-drawer
    clipped
    enable-resize-watcher
    fixed
    app
    bottom
    permanent
    :mini-variant.sync="sidebar.mini"
    mini-variant-width="75"
  >
    <v-list>
      <div
        v-for="(item, i) in items"
        :key="i"
        :class="{'blue--text': $route.name === item.to}"
      >
        <v-list-group v-if="item.subItems" append-icon="">
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
            v-show="show (subItem.only)"
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
    <the-footer />
  </v-navigation-drawer>
</template>

<script>
import TheFooter from './TheFooter'

export default {
  name: "the-sidebar",
  components: {
    TheFooter,
  },
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
        name: "contest_list",
        icon: "list",
        title: this.$t ('contest.list'),
        to: "events",
      },{
        name: "marathon_survey",
        icon: "assignment",
        title: this.$t ('marathon_survey.index'),
        subItems: [
           {
             name: "personal_score",
             icon: "directions_run",
             title: this.$t('personal_score'),
             to: "runner_records",
             only: 'Member',
           },
           {
             name: "register_record",
             icon: "event_available",
             title: this.$t('runner.create_record'),
             to: "runner_register_record",
             only: 'Member',
           },
           {
             name: "runner_review",
             icon: "directions_run",
             title: this.$t('review_runner'),
             to: "runners",
             only: 'Manager',
           },
           {
             name: "records_review",
             icon: "event_available",
             title: this.$t('review_record'),
             to: "records_review",
             only: 'Manager',
           }
         ],
      })
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
    show (only) {
      this.$set (this.me, 'can', this.me.can)
      if (only === undefined) {
        return true
      } else if (this.me.show && this.me.can.manage === true) {
        return true
      } else if (this.me.show && this.me.can.attend === true) {
        return only === 'Member'
      } else {
        return false
      }
    },
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
