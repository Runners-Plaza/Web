<template>
  <runner-update v-if="verified === true" />
  <runner-status v-else-if="verified === false" />
</template>

<script>
import RunnerUpdate from '../runner/Update.vue'
import RunnerStatus from '../runner/Status.vue'

export default {
  name: 'runner-index',
  inject: [
    'updateRegisterStatus',
  ],
  provide () {
    return {
      updateStatus: this.updateStatus,
    }
  },
  components: {
    RunnerUpdate,
    RunnerStatus,
  },
  data() {
    return {
      verified: null,
    }
  },
  created () {
    this.getRunnerInformation ()
  },
  methods: {
    getRunnerInformation () {
      this.runnersPlaza.getRunner().then ((runner) => {
        if (runner.status === 'Approved') {
          this.verified = true;
        } else {
          this.verified = false;
        }
      });
    },
    updateStatus () {
      this.getRunnerInformation ()
      this.updateRegisterStatus ()
    },
  },
}

</script>
