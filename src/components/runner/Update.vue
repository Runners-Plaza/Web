<template>
  <v-layout column wrap>
    <v-form
      v-if="runner"
      ref="form"
      v-model="valid"
      class="profile ma-3"
      lazy-validation
    >
      <h3 align="center">{{ $t ('runner.data_update') }}</h3>
      <v-list-tile-content>
        <v-list-tile-sub-title v-text="$t ('status')" />
        <v-list-tile-title v-text="$t (runner.status)" />
      </v-list-tile-content>
      <v-list-tile-content>
        <v-list-tile-sub-title v-text="$t ('name')" />
        <v-list-tile-title v-text="runner.name" />
      </v-list-tile-content>
      <v-list-tile-content>
        <v-list-tile-sub-title v-text="$t ('alternative_name')" />
        <v-list-tile-title v-text="runner.alternative_name" />
      </v-list-tile-content>
      <v-list-tile-content>
        <v-list-tile-sub-title v-text="$t ('english_name')" />
        <v-list-tile-title v-text="runner.english_name" />
      </v-list-tile-content>
      <v-list-tile-content>
        <v-list-tile-sub-title v-text="$t ('alternative_english_name')" />
        <v-list-tile-title v-text="runner.alternative_english_name" />
      </v-list-tile-content>
      <v-list-tile-content>
        <v-list-tile-sub-title v-text="$t ('birthday')" />
        <v-list-tile-title v-text="runner.birthday" />
      </v-list-tile-content>

      <v-text-field
        v-model="form.phone"
        :rules="phoneRules"
        :label="$t ('phone')"
        required
      ></v-text-field>

      <v-text-field
        v-model="form.organization"
        :rules="organizationRules"
        :counter=50
        :label="$t ('organization')"
        required
      ></v-text-field>

      <v-btn
        block
        dark
        :disabled="!valid"
        color="blue lighten-3"
        @click="validate"
      >
        {{ $t ('submit') }}
      </v-btn>
    </v-form>
  </v-layout>
</template>

<script>

export default {
  name: 'runner-update',
  data () {
    return {
      valid: false,
      runner: null,
      form: {
        phone: '',
        organization: '',
      },
      phoneRules: [
        v => !!v || 'Phone is required',
        v => /\d{10}/.test(v) || 'Phone must be valid'
      ],
      organizationRules: [
        v => !!v || 'Organization is required',
        v => (v && v.length <= 50) || 'Organization must be less than 50 characters'
      ],
    }
  },
  mounted () {
    this.runnersPlaza.getRunner().then ((runner) => {
      this.apply (runner)
    })
  },
  methods: {
    submit () {
      this.runnersPlaza.patchRunner(this.form).then ((runner) => {
        this.apply (runner)
      })
    },
    validate () {
      if (this.$refs.form.validate()) {
	this.submit()
      }
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    apply (runner) {
      this.runner = runner
      this.form.phone = runner.phone
      this.form.organization = runner.organization
    },
  },
}
</script>
