<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row>
        <v-layout column align-center>
          <the-statistics />
        </v-layout>
        <v-layout column align-center>
          <h6 class="title">{{ $t ('latest_break_pb') }}</h6>
        </v-layout>
        <v-layout column align-center>
          <h6 class="title">{{ $t ('latest_complete_first_marathon') }}</h6>
        </v-layout>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
<script>
import TheStatistics from '../../components/marathon-survey/TheStatistics.vue'

export default {
  name: "MarathonSurveyIndex",
  data() {
    return {
      items: [
        {
        },
      ],
    }
  },
  props: {
  },
  components: {
    TheStatistics,
  },
}
</script>
