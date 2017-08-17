import Vue from 'vue'
import Vuex from 'vuex'
import { getStore } from 'common/js/storage'

Vue.use(Vuex)

const state = {
    userInfo: {
        username: null,
        store: null
    },
    language: getStore('language') || 'zh'
}

const mutations = {
    UPDATEUSERINFO (state, payload) {
        state.userInfo = Object.assign(state.userInfo, payload)
    },
    UPDATELANGUAGE (state, payload) {
        state.language = payload
    }
}

const actions = {

}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store
