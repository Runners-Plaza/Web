<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-btn color="blue lighten-3"
         to="/runners"
         v-text="$t ('back_to.list')" />
    </v-layout>
    <runner-detail :id="id" />
  </v-container>
</template>

<script>
import RunnerDetail from '../../components/runner/Detail.vue'

export default {
  name: 'RunnersDetail',
  components: {
    RunnerDetail,
  },
  data () {
    return {
      id: null,
    }
  },
  created () {
    this.id = this.$route.params.id
  },
}
</script>
