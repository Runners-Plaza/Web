import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en_US from '@/lang/en_US'
import zh_TW from '@/lang/zh_TW'

Vue.use (VueI18n)

const locale = 'zh_TW'

const messages = {
  en_US: en_US,
  zh_TW: zh_TW,
}

const i18n = new VueI18n ({
  locale,
  messages,
})

export default i18n
