<template>
  <v-container fluid>
    <v-btn color="blue lighten-3"
       to="/events"
       v-text="$t ('back_to.list')" />
    <detail />
  </v-container>
</template>

<script>
import Detail from '../../components/events/Detail'

export default {
  name: 'EventDetail',
  components: {
    Detail,
  },
}
</script>
