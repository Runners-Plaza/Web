<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm4>
        <survey-statistics-list />
      </v-flex>
      <v-flex xs12 sm4>
        <latest-break-personal-best-list />
      </v-flex>
      <v-flex xs12 sm4>
        <latest-complete-first-marathon-list />
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 justify-center>
        <record-list />
      </v-flex>
    </v-layout>
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
import SurveyStatisticsList from '../../components/marathon-survey/SurveyStatisticsList.vue'
import LatestBreakPersonalBestList from '../../components/marathon-survey/LatestBreakPersonalBestList.vue'
import LatestCompleteFirstMarathonList from '../../components/marathon-survey/LatestCompleteFirstMarathonList.vue'
import RecordList from '../../components/marathon-survey/RecordList.vue'

export default {
  name: "MarathonSurveyIndex",
  components: {
    SurveyStatisticsList,
    LatestBreakPersonalBestList,
    LatestCompleteFirstMarathonList,
    RecordList,
  },
}
</script>
