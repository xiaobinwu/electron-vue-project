import Vue from 'vue'
import Vuex from 'vuex'
import { getStore } from 'common/js/storage'
import ajaxUrl, { commonAjax } from 'common/js/api'
Vue.use(Vuex)

const state = {
    userInfo: {
        username: null,
        store: null,
        storeid: null,
        src: null,
        room: null
    },
    language: getStore('language') || 'zh',
    // 存放历史记录
    messhistory: {
        infos: [],
        allmessage: []
    },
    // 存放房间信息，为了方便以后做多房间
    roomdetail: {
        id: '',
        users: {},
        infos: []
    }
}

const mutations = {
    UPDATEUSERINFO (state, payload) {
        state.userInfo = Object.assign(state.userInfo, payload)
    },
    UPDATELANGUAGE (state, payload) {
        state.language = payload
    },
    // 设置用户进入房间，默认为'room1'
    SETUSERROOM (state, payload) {
        state.userInfo.room = payload
    },
    // 设置房间信息-在线用户
    SETUSERS (state, payload) {
        state.roomdetail.users = payload
    },
    // 添加当前聊天信息到store
    ADDROOMDETAILINFOS (state, payload) {
        state.roomdetail.infos.push(payload)
    },
    // 将所在房间中当前聊天信息置空
    SETROOMDETAILINFOS (state) {
        state.roomdetail.infos = []
    },
    // 设置异步请求回来的聊天记录
    SETMESSHISTORYINFOS (state, data) {
        state.messhistory.infos = data
    }
}

const actions = {
    getmesshistory ({ commit }, data) {
        commonAjax({
            method: 'post',
            url: ajaxUrl.message,
            data: data,
            responseType: 'json'
        })
        .then((res) => {
            console.log(res)
            if (res.status === 0) {
                commit('SETMESSHISTORYINFOS', res.data)
            }
        })
    }
}

const getters = {
    // 获取store里面的房间id，默认为room1
    getuserroom: state => state.userInfo.room,
    // 获取历史信息
    getmesshistoryinfos: state => state.messhistory.infos,
    // 获取当前聊天信息
    getinfos: state => state.roomdetail.infos,
    // 获取当前在线用户
    getusers: state => state.roomdetail.users
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

export default store
