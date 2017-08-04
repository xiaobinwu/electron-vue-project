import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ElementLocale from 'element-ui/lib/locale'
import { sync } from 'vuex-router-sync'
import App from 'components/App'
import router from './router'
import store from './store'
import lang from 'common/lang'
import { getStore } from 'common/js/storage'


Vue.use(VueI18n)

sync(store, router)

const i18n = new VueI18n({
    locale: getStore('language') || 'zh', // 默认值
    messages: lang
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

const app = new Vue({
    router,
    store,
    i18n,
    ...App
})

export { app, router, store }
