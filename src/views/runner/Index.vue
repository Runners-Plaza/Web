<template>
  <div>
    <runner-information v-if="registered === true" />
    <runner-register v-if="registered === false" />
  </div>
</template>

<script>
import RunnerInformation from '../../components/runner/Index'
import RunnerRegister from '../../components/runner/Register'

export default {
  name: 'RunnerIndex',
  components: {
    RunnerInformation,
    RunnerRegister,
  },
  provide () {
    return {
      updateRegisterStatus: this.updateRegisterStatus,
    }
  },
  data () {
    return {
      registered: null,
    }
  },
  created () {
    this.updateRegisterStatus ()
  },
  methods: {
    updateRegisterStatus () {
      this.runnersPlaza.getRunner().then ((runner) => {
        this.registered = (runner.error == undefined)
      })
    },
  },
}
</script>
