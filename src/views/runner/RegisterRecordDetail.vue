<template>
  <v-container fluid>
    <v-btn color="blue lighten-3"
       to="/runner/register_record"
       v-text="$t ('back_to.list')" />
    <v-btn color="blue lighten-3"
       @click="createRecord ()"
       v-text="$t ('runner.create_record')" />
    <detail />
  </v-container>
</template>

<script>
import Detail from '../../components/events/Detail'

export default {
  name: 'RunnerRegisterRecordDetail',
  components: {
    Detail,
  },
  methods: {
    createRecord () {
      this.$router.replace ('/runner/register_record/' + this.$route.params.id + '/create')
    },
  },
}
</script>
