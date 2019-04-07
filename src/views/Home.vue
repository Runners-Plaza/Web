<template>
  <v-container fluid>
    <v-layout column align-center>
        <h6 class="title">{{ $t ('main_page_text') }}</h6>
    </v-layout>
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
        <v-flex xs12 sm6 align-center>
            <latest-registered-runners-list />
        </v-flex>    
        <v-flex xs12 sm6 align-center>
            <runners-honor-roll />
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
import SurveyStatisticsList from '../components/widgets/SurveyStatisticsList.vue'
import LatestBreakPersonalBestList from '../components/widgets/LatestBreakPersonalBestList.vue'
import LatestCompleteFirstMarathonList from '../components/widgets/LatestCompleteFirstMarathonList.vue'
import LatestRegisteredRunnersList from '../components/widgets/LatestRegisteredRunnersList.vue'
import RunnersHonorRoll from '../components/widgets/RunnersHonorRoll.vue'

export default {
  name: "Home",
  components: {
    SurveyStatisticsList,
    LatestBreakPersonalBestList,
    LatestCompleteFirstMarathonList,
    LatestRegisteredRunnersList,
    RunnersHonorRoll,
  },
}

</script>
