import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    userInfo: {
        username: null,
        password: null
    }
}

const mutations = {
    UPDATEUSERINFO (state, payload) {
        state.userInfo = Object.assign(state.userInfo, payload)
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
