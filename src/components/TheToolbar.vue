<template>
  <v-toolbar color="teal" dark clipped-left app>
    <v-toolbar-side-icon @click.stop="sidebar.show = !sidebar.show" />
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <v-toolbar-items>
      <v-menu left bottom>
        <v-btn icon slot="activator">
          <v-icon>language</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="language in languages"
            :key="language.id"
            @click="changeLanguage (language)">
            <v-list-tile-title v-text="language.name" />
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu left bottom>
        <v-btn icon slot="activator">
          <v-icon>person</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-if="me.show">
            <v-list-tile-content>
              <v-list-tile-title v-text="me.name" />
              <v-list-tile-sub-title v-text="me.email" />
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="me.show" />
          <v-list-tile
            v-for="profileService in profileServices"
            :key="profileService.id"
            @click="executeService (profileService)">
            <v-list-tile-title v-text="profileService.title" />
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
const titles = {
  users: 'users',
  profile: 'my.profile',
  events: 'contest.list',
  events_detail: 'contest.detail',
  runner: 'runner_information',
  runner_register_record: 'runner.register_record',
  runner_register_record_detail: 'runner.register_record',
  runners: 'runners_list',
  runner_detail: 'runner_information',
  runner_detail: 'runner_information',
  events_update: 'contest.edit',
  distance_create: 'distance.create',
  distance_update: 'distance.update',
  runner_records: 'runner.records',
  record_update: 'runner.record',
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
    profileServices () {
      let items = []
      if (this.me.show) {
        items.push ({
          name: "profile",
          icon: "account_box",
          title: this.$t ('my.profile'),
          to: "profile",
        },{
          name: "runner",
          icon: "direcions_run",
          title: this.$t ('runner_information'),
          to: "runner",
        })
        if (this.me.can.manage) {
          items.push ({
            name: "users",
            icon: "people",
            title: this.$t ('users'),
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
          title: this.$t ('login.from.facebook'),
          to: "login",
        })
      }
      return items
    },
  },
  methods: {
    changeLanguage (language) {
      this.$i18n.locale = language.id
      this.$cookie.set ('language', language.id, '1')
      this.toaster.success (this.$t ('changed'))
    },
    executeService (service) {
      if (service.name === "log out") {
        this.logout ().then (() => {
          this.toaster.success (this.$t ('logout.success'))
        })
      } else if (service.name === "log in"){
        this.login ()
      } else {
        this.$router.replace ({ name: service.to })
      }
    },
    login () {
      this.facebook.login ()
    },
  },
}
</script>
