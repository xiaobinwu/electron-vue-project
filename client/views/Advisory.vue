<template>
    <section class="wrapper">
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
import { Button, Row, Col, Input, Message } from 'element-ui'
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
export default {
    data () {
        return {
            socket: '',
            message: ''
        }
    },
    created () {
        this.socket = io.connect(socketUrl)
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
            if (this.message === '') {
                const storage = JSON.parse(getStore('userInfo'))
                let obj = {
                    username: storage.username,
                    store: storage.store,
                    src: '',
                    img: '',
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