import Vue from 'vue'
import store from '~/store'
import iView from 'iview';
import VueI18n from 'vue-i18n'
import en from 'iview/dist/locale/en-US';
import ru from 'iview/dist/locale/ru-RU';

Vue.use(VueI18n);
Vue.use(iView, {locale: (store.getters['lang/locale'] === 'ru') ? ru : en});

const i18n = new VueI18n({
  locale: 'ru',
  messages: {}
})

/**
 * @param {String} locale
 */
export async function loadMessages (locale) {
  if (Object.keys(i18n.getLocaleMessage(locale)).length === 0) {
    const messages = await import(/* webpackChunkName: "lang-[request]" */ `~/lang/${locale}`)
    i18n.setLocaleMessage(locale, messages)
  }

  if (i18n.locale !== locale) {
    i18n.locale = locale
  }
}

(async function () {
  await loadMessages(store.getters['lang/locale'])
})();

export default i18n
