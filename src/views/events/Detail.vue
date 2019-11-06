<template>
  <div>
    <v-btn color="blue lighten-3"
       to="/events"
       v-text="$t ('back_to.list')" />
    <detail />
  </div>
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
