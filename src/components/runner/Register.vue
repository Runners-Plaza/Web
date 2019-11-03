<template>
  <v-form
    ref="form"
    v-model="valid"
    class="profile ma-3"
    lazy-validation
  >
    <h3 align="center">{{ $t ('register_to_be_runner') }}</h3>
    <v-text-field
      v-model="form.name"
      :counter="10"
      :rules="nameRules"
      :label="$t ('name')"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.alternative_name"
      :counter="10"
      :label="$t ('alternative_name')"
    ></v-text-field>

    <v-text-field
      v-model="form.english_name"
      :counter="30"
      :label="$t ('english_name')"
    ></v-text-field>

    <v-text-field
      v-model="form.alternative_english_name"
      :counter="30"
      :label="$t ('alternative_english_name')"
    ></v-text-field>

    <v-menu
      v-model="birthdayMenu"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="form.birthday"
        :label="$t ('birthday')"
        prepend-icon="event"
        :rules="birthdayRules"
        required
        readonly
      ></v-text-field>
      <v-date-picker v-model="form.birthday" @input="birthdayMenu = false" />
    </v-menu>

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

    <v-btn
      block
      dark
      color="error"
      @click="reset"
    >
      {{ $t ('reset_form') }}
    </v-btn>
  </v-form>

</template>

<script>

export default {
  name: 'runner-register',
  inject: [
    'updateRegisterStatus',
  ],
  data () {
    return {
      valid: false,
      form: {
        name: '',
        alternative_name: '',
        english_name: '',
        alternative_english_name: '',
        birthday: '',
        phone: '',
        organization: '',
      },
      birthdayMenu: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      birthdayRules: [
        v => !!v || 'Birthday is required',
        v => /\d{4}-\d{2}-\d{2}/.test(v) || 'Birthday must be valid'
      ],
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
  methods: {
    submit () {
      this.runnersPlaza.postRunner(this.form).then ((runner) => {
        this.updateRegisterStatus ()
      })
    },
    validate () {
      if (this.$refs.form.validate()) {
	this.submit()
      }
    },
    reset () {
      if (confirm(this.$t('confirm.reset_form'))) {
        this.$refs.form.reset()
      }
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  },
}
</script>

<style>
.profile {
  background: inherit
}
</style>
