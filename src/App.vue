<template>
  <v-app>
    <the-sidebar />
    <the-toolbar />
    <v-content>
      <router-view />
      <the-toast />
    </v-content>
    <the-footer />
  </v-app>
</template>

<script>
import TheSidebar from './components/TheSidebar'
import TheToolbar from './components/TheToolbar'
import TheFooter from './components/TheFooter'

export default {
  name: 'App',
  components: {
    TheSidebar,
    TheToolbar,
    TheFooter
  }
}
</script>
