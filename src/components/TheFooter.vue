<template>
  <v-footer fixed app>
    <v-flex
      teal
      lighten-2
      py-2
      text-xs-center
      white--text
      >
      &copy; 2018 - {{title}}
    </v-flex>
  </v-footer>
</template>

<script>
export default {
  name: 'the-footer',
  data () {
    return {
      title: 'Runners\' Plaza'
    }
  }
}
</script>
