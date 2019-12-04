<template>
  <v-container fluid>
    <v-btn color="blue lighten-3"
       @click="backToDetail ()"
       v-text="$t ('back_to.list')" />
    <detail
      :id="recordId"
    />
  </v-container>
</template>

<script>
import Detail from '../../components/records/Detail'

export default {
  name: 'EventRecordDetail',
  data () {
    return {
      recordId: null,
      id: null,
    }
  },
  components: {
    Detail,
  },
  created () {
    this.recordId = this.$route.params.recordId
    this.id = this.$route.params.id
  },
  methods: {
    backToDetail () {
      this.$router.replace ('/events/' + this.id)
    },
  },
}
</script>
