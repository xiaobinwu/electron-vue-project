<template>
    <section class="wrapper">
        <div class="chat-container">
            <div v-for="obj in messHistoryInfos">
                    <other-msg v-if="obj.username!=username" :name="obj.username" :head="obj.src" :msg="obj.msg"
                              :img="obj.img" :mytime="obj.time"></other-msg>
                    <my-msg v-if="obj.username==username" :name="obj.username" :head="obj.src" :msg="obj.msg"
                           :img="obj.img" :mytime="obj.time"></my-msg>
            </div>
        </div>
        <div class="advisory-bottom">
            <el-row :gutter="20">
                <el-col :span="20">
                    <el-input
                        placeholder="请输入内容"
                        v-model="message">
                    </el-input>
                </el-col>
                <el-col :span="4"><el-button type="primary" size="small" @click="sendMessage" class="send-btn">发送</el-button></el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <i class="el-icon-picture" @click="imgupload"></i>
                    <el-button type="text"><router-link :to="{ path: '/' }">Home</router-link></el-button>
                    <input id="inputFile" name='inputFile' type='file' multiple='mutiple' accept="image/*;capture=camera" style="display: none" @change="fileup">
                </el-col>
            </el-row>
        </div>
    </section>
</template>

<script>
import io from 'socket.io-client'
import { socketUrl } from 'common/js/api'
import { getStore } from 'common/js/storage'
import Vue from 'vue'
import MyMsg from 'components/MyMsg'
import OtherMsg from 'components/OtherMsg'
import { Button, Row, Col, Input, Message } from 'element-ui'
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
export default {
    data () {
        return {
            socket: '',
            message: '',
            username: JSON.parse(getStore('userInfo')).username
        }
    },
    created () {
        this.socket = io.connect(socketUrl)
        // 目前单房间状态，默认为‘room1’
        const storage = JSON.parse(getStore('userInfo'))
        const obj = {
            name: storage.username,
            src: storage.src,
            roomid: 'room1'
        }
        this.$store.commit('SETUSERROOM', obj.roomid)
        this.socket.emit('enter', obj)
        this.socket.on('enter', (obj) => {
            this.$store.commit('SETUSERS', obj)
        })
        const data = {
            roomid: obj.roomid
        }
        // 获取历史聊天信息
        this.$store.dispatch('getmesshistory', data)
        // 将当前store里面的聊天信息置空
        this.$store.commit('SETROOMDETAILINFOS')
    },
    mounted () {
        // 监听发送过去的信息，发起commit更新历史信息
        this.socket.on('message', (data) => {
            console.log(data)
        })
    },
    methods: {
        sendMessage () {
            // 判断发送信息是否为空
            if (this.message !== '') {
                const storage = JSON.parse(getStore('userInfo'))
                let obj = {
                    username: storage.username,
                    store: storage.store,
                    storeid: storage.storeid,
                    src: storage.src,
                    img: '',
                    roomid: this.currentUserRoom,
                    msg: this.message,
                    time: new Date()
                }
                // 传递消息信息
                this.socket.emit('message', obj)
                this.message = ''
            } else {
                Message({
                    message: '发送内容不为空',
                    type: 'warning',
                    duration: 1000
                })
            }
        },
        imgupload () {

        },
        fileup () {

        }
    },
    computed: {
        currentUserRoom () {
            return this.$store.getters.getuserroom
        },
        messHistoryInfos () {
            return this.$store.getters.getmesshistoryinfos
        }
    },
    components: {
        otherMsg: MyMsg,
        myMsg: OtherMsg
    }
}
</script>
<style lang="scss" scoped>
@import "../common/css/_variables.scss";
.wrapper{
    height: calc(100vh - 100px);
    overflow-y: auto;
    .advisory-bottom{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 80px;
        padding: 10px;
        background: #eeeff3;
        .send-btn{
            width: 100%;
        }
        .el-icon-picture{
            font-size: $size-h1;
            color: $main;
            margin-top: 10px;
            margin-left: 8px;
            cursor: pointer;
        }
    }
}
</style>