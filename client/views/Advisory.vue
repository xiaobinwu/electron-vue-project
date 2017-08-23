<template>
    <section class="wrapper" v-loading="loading">
        <div class="title">
            <i class="el-icon-arrow-left" @click="logoutChat"></i>
            <div>{{$t('chat')}}（{{Object.keys(currentUsers).length}}）</div>
            <div class="tip">
                <i class="iconfont icon-xiaoquxinwen"></i>
                <span class="tip-msg" v-if="userJoinTip">{{userJoinTip}} <span v-text="chatRoomStatus ? $t('enterChatRoom') : $t('outChatRoom')"></span></span>
            </div>
            <i class="el-icon-setting"></i>
        </div>
        <div class="all-chat">
            <div class="all-chat-title">{{$t('onlineStaff')}}</div>
            <div v-for="obj in currentUsers" class="online">
                <div><img :src="obj.src" alt=""></div>
                <div class="all-chat-name" :title="obj.name +'（' + obj.store + '）'">{{obj.name}}（{{obj.store}}）</div>
            </div>
        </div>
        <div class="chat-container">
            <div v-for="obj in messHistoryInfos">
                <other-msg v-if="obj.username!=username" :name="obj.username" :head="obj.src" :msg="obj.msg" :store="obj.store"
                          :img="obj.img" :mytime="obj.time"></other-msg>
                <my-msg v-if="obj.username==username" :name="obj.username" :head="obj.src" :msg="obj.msg" :store="obj.store"
                       :img="obj.img" :mytime="obj.time"></my-msg>
            </div>
            <div v-for="obj in messCurrentInfos">
                <other-msg v-if="obj.username!=username" :name="obj.username" :head="obj.src" :msg="obj.msg" :store="obj.store"
                          :img="obj.img" :mytime="obj.time"></other-msg>
                <my-msg v-if="obj.username==username" :name="obj.username" :head="obj.src" :msg="obj.msg" :store="obj.store"
                       :img="obj.img" :mytime="obj.time"></my-msg>
            </div>
            <div id="chat-bottom"></div>
        </div>
        <div class="advisory-bottom">
            <el-row :gutter="20">
                <el-col :span="20">
                    <el-input
                        :placeholder="$t('enterGroup', [$t('content')])"
                        v-model="message">
                    </el-input>
                </el-col>
                <el-col :span="4"><el-button type="primary" size="small" @click="sendMessage" class="send-btn">{{$t('btn.send')}}</el-button></el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <i class="el-icon-picture" @click="imgupload"></i>
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
import { Button, Row, Col, Input, Message, Loading } from 'element-ui'
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Loading)
export default {
    data () {
        return {
            socket: '',
            message: '',
            loading: false,
            userJoinTip: '',
            chatRoomStatus: false,
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
            store: storage.store,
            roomid: 'room1'
        }
        this.$store.commit('SETUSERROOM', obj.roomid)
        this.socket.emit('enter', obj)
        this.socket.on('enter', (obj) => {
            this.$store.commit('SETUSERS', obj.users)
            this.chatRoomStatus = true
            this.userJoinTip = `${obj.name}（${obj.store}）`
        })
        this.socket.on('out', (obj) => {
            this.$store.commit('SETUSERS', obj.users)
            this.chatRoomStatus = false
            this.userJoinTip = `${obj.name}（${obj.store}）`
            // 如果用户为本人时，就退出
            if (storage.username === obj.name) {
                this.$router.push({ path: '/' })
            }
        })
        const data = {
            roomid: obj.roomid
        }
        // 获取历史聊天信息
        this.loading = true
        this.$store.dispatch('getmesshistory', { data: data, obj: this })
        // 将当前store里面的聊天信息置空
        this.$store.commit('SETROOMDETAILINFOS')
    },
    mounted () {
        this.$file = document.getElementById('inputFile')
        this.$chatBottom = document.getElementById('chat-bottom')
        // 监听发送过去的信息，发起commit更新信息
        this.socket.on('message', (data) => {
            console.log(data)
            this.$store.commit('ADDROOMDETAILINFOS', data)
            this.$nextTick(() => {
                this.$chatBottom.scrollIntoView()
            })
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
                    message: this.$t('sendTip'),
                    type: 'warning',
                    duration: 1000
                })
            }
        },
        logoutChat () {
            const storage = JSON.parse(getStore('userInfo'))
            const obj = {
                name: storage.username,
                src: storage.src,
                store: storage.store,
                roomid: this.currentUserRoom
            }
            this.socket.emit('out', obj)
        },
        imgupload () {
            this.$file.click()
        },
        fileup () {
            const file = this.$file.files[0]
            if (file) {
                const storage = JSON.parse(getStore('userInfo'))
                if (file.size > 10240) {
                    // 方式一（FormData合成表单对象，mutilparty处理上传 => 有问题）
                    let formData = new window.FormData()
                    formData.append('file', file)
                    formData.append('username', storage.username)
                    formData.append('storeid', storage.storeid)
                    formData.append('store', storage.store)
                    formData.append('src', storage.src)
                    formData.append('roomid', this.currentUserRoom)
                    this.$store.dispatch('uploadimg', formData)
                } else {
                    // 方式二 （读取FileReader[一般用于图片本地预览]原始数据缓冲区的数据，转化成dataURL）
                    let fr = new window.FileReader()
                    fr.onload = (oFREvent) => {
                        var obj = {
                            username: storage.username,
                            src: storage.src,
                            img: oFREvent.target.result,
                            msg: '',
                            roomid: this.currentUserRoom,
                            storeid: storage.storeid,
                            store: storage.store,
                            time: new Date()
                        }
                        this.socket.emit('message', obj)
                    }
                    fr.readAsDataURL(file)
                }
            } else {
                console.log('必须有文件')
            }
        }
    },
    computed: {
        currentUserRoom () {
            return this.$store.getters.getuserroom
        },
        messHistoryInfos () {
            return this.$store.getters.getmesshistoryinfos
        },
        messCurrentInfos () {
            return this.$store.getters.getinfos
        },
        currentUsers () {
            return this.$store.getters.getusers
        }
    },
    components: {
        otherMsg: OtherMsg,
        myMsg: MyMsg
    }
}
</script>
<style lang="scss" scoped>
@import "../common/css/_variables.scss";
@import "../common/css/_mixins.scss";
@import "../common/css/_placeholders.scss";
$gray-light: #eeeff3;
.wrapper{
    height: calc(100vh - 135px);
    margin-top: 35px;
    overflow-y: auto;
    .all-chat{
        .all-chat-title{
            height: 30px;
            line-height: 30px;
            background-color: rgba(238,238,238,.2);
            padding-left: 10px;
        }
        .online{
            width: 60px;
            text-align: center;
            display: inline-block;
            margin: 10px;
            img{
                width: 40px;
                height: 40px;
                border-radius: 100%;
            }
            .all-chat-name{
                width: 100%;
                @extend  %ellipsis;
            }
        }
    }
    .chat-container{
        padding: 10px 0;
    }
    .title {
        position: fixed;
        top: 30px;
        left: 0;
        right: 0;
        height: 35px;
        background-color: $pink;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .tip{
            position: absolute;
            right: 130px;
            top: 0.5px;
            height: 35px;
            overflow-y: hidden;
            max-width: 300px;
            @extend %ellipsis;
            i {
                font-size: 28px;
                position: relative;
                vertical-align: middle;
            }
            .tip-msg {
                font-size: 12px;
                min-width: 155px;
            }
        }
        & > * {
            display: block;
        }
        i{
            cursor: pointer;
            &.el-icon-arrow-left{
                margin-left: 10px;
            }
            &.el-icon-setting{
                margin-right: 10px;
            }
        }
    }
    .advisory-bottom{
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 80px;
        padding: 10px;
        background: $gray-light;
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