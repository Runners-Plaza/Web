<template>
  <v-footer
    fixed
    color="white"
    height="64">
    <v-flex
      py-2
      text-xs-center
      >
      &copy; 2019 - {{title}}
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
  },
}
</script>
